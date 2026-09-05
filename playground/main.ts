import {
  createConnection,
  createLongLivedTokenAuth,
  getStates,
  subscribeEntities,
  type Connection,
  type HassEntities,
} from "home-assistant-js-websocket";
import "../src/carlinko-card";
import type { CarlinkoOverview } from "../src/cards/overview";
import type { CarlinkoCharging } from "../src/cards/charging";
import type { HassEntityRegistryEntry, HomeAssistant } from "../src/core/types";

/** Minimal ha-card so cards render outside Lovelace. */
if (!customElements.get("ha-card")) {
  class HaCard extends HTMLElement {
    static get observedAttributes() {
      return [];
    }
  }
  customElements.define("ha-card", HaCard);
  const style = document.createElement("style");
  style.textContent = `
    ha-card {
      display: block;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
    }
  `;
  document.head.appendChild(style);
}

interface DeviceRegistryEntry {
  id: string;
  name: string | null;
  name_by_user: string | null;
  manufacturer: string | null;
  model: string | null;
  identifiers: Array<[string, string] | string[]>;
  disabled_by?: string | null;
}

interface EntityRegistryRow {
  entity_id: string;
  unique_id?: string;
  platform?: string;
  device_id?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
}

const haUrl = (import.meta.env.VITE_HA_URL as string | undefined)?.replace(
  /\/$/,
  "",
);
const haToken = import.meta.env.VITE_HA_TOKEN as string | undefined;
const defaultDeviceId = (import.meta.env.VITE_DEVICE_ID as string) || "";

const statusEl = document.getElementById("status")!;
const deviceSelect = document.getElementById("device") as HTMLSelectElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const applyBtn = document.getElementById("apply") as HTMLButtonElement;
const host = document.getElementById("card-host")!;

let connection: Connection | undefined;
let hass: HomeAssistant | undefined;
let overviewCard: CarlinkoOverview | undefined;
let chargingCard: CarlinkoCharging | undefined;
let entityRegistry: EntityRegistryRow[] = [];

function setStatus(text: string, kind: "" | "ok" | "err" = "") {
  statusEl.textContent = text;
  statusEl.className = `status ${kind}`;
}

function isCarlinkoDevice(device: DeviceRegistryEntry): boolean {
  if (device.disabled_by) {
    return false;
  }
  return (device.identifiers || []).some((id) => {
    if (Array.isArray(id) && id.length >= 1) {
      return id[0] === "carlinko";
    }
    return false;
  });
}

function deviceLabel(device: DeviceRegistryEntry): string {
  return (
    device.name_by_user ||
    device.name ||
    [device.manufacturer, device.model].filter(Boolean).join(" ") ||
    device.id
  );
}

function mergeRegistry(
  base: HomeAssistant["entities"],
  registry: EntityRegistryRow[],
): Record<string, HassEntityRegistryEntry> {
  const out: Record<string, HassEntityRegistryEntry> = { ...(base || {}) };
  for (const row of registry) {
    out[row.entity_id] = {
      entity_id: row.entity_id,
      unique_id: row.unique_id,
      platform: row.platform,
      device_id: row.device_id,
      disabled_by: row.disabled_by,
      hidden_by: row.hidden_by,
    };
  }
  return out;
}

function buildHass(conn: Connection, states: HassEntities): HomeAssistant {
  const entities: HomeAssistant["entities"] = {};
  for (const entityId of Object.keys(states)) {
    entities[entityId] = { entity_id: entityId };
  }

  return {
    states: states as HomeAssistant["states"],
    entities: mergeRegistry(entities, entityRegistry),
    hassUrl: haUrl,
    callService: async (domain, service, serviceData = {}) => {
      await conn.sendMessagePromise({
        type: "call_service",
        domain,
        service,
        service_data: serviceData,
      });
    },
  };
}

function populateDevices(devices: DeviceRegistryEntry[]) {
  const carlinko = devices.filter(isCarlinkoDevice);
  deviceSelect.replaceChildren();

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent =
    carlinko.length === 0
      ? "No CarLinko devices found"
      : "Select a vehicle device…";
  deviceSelect.appendChild(placeholder);

  for (const device of carlinko) {
    const opt = document.createElement("option");
    opt.value = device.id;
    opt.textContent = deviceLabel(device);
    deviceSelect.appendChild(opt);
  }

  if (defaultDeviceId && carlinko.some((d) => d.id === defaultDeviceId)) {
    deviceSelect.value = defaultDeviceId;
  }

  deviceSelect.disabled = carlinko.length === 0;
}

function mountCards() {
  if (!hass) {
    return;
  }
  const deviceId = deviceSelect.value.trim();
  if (!deviceId) {
    setStatus("Select a CarLinko vehicle device", "err");
    return;
  }

  const title = titleInput.value.trim() || undefined;

  if (!overviewCard || !chargingCard) {
    overviewCard = document.createElement("carlinko-overview") as CarlinkoOverview;
    chargingCard = document.createElement("carlinko-charging") as CarlinkoCharging;
    host.replaceChildren(overviewCard, chargingCard);
  }

  overviewCard.hass = hass;
  overviewCard.setConfig({
    device_id: deviceId,
    title: title || "CarLinko Overview",
  });

  chargingCard.hass = hass;
  chargingCard.setConfig({
    device_id: deviceId,
    title: "Charging",
  });

  setStatus(`Cards mounted for device ${deviceId}`, "ok");
}

function syncHass() {
  if (!hass) {
    return;
  }
  if (overviewCard) {
    overviewCard.hass = hass;
  }
  if (chargingCard) {
    chargingCard.hass = hass;
  }
}

async function connect() {
  if (!haUrl || !haToken) {
    setStatus(
      "Missing VITE_HA_URL or VITE_HA_TOKEN in playground/.env.local",
      "err",
    );
    applyBtn.disabled = true;
    deviceSelect.disabled = true;
    return;
  }

  setStatus("Connecting…");
  try {
    const auth = createLongLivedTokenAuth(haUrl, haToken);
    connection = await createConnection({ auth });

    entityRegistry = (await connection.sendMessagePromise({
      type: "config/entity_registry/list",
    })) as EntityRegistryRow[];

    const devices = (await connection.sendMessagePromise({
      type: "config/device_registry/list",
    })) as DeviceRegistryEntry[];
    populateDevices(devices);

    const stateList = await getStates(connection);
    const initialStates = Object.fromEntries(
      stateList.map((s) => [s.entity_id, s]),
    ) as HassEntities;
    hass = buildHass(connection, initialStates);

    subscribeEntities(connection, (ents) => {
      if (!connection) {
        return;
      }
      hass = buildHass(connection, ents);
      syncHass();
    });

    setStatus(`Connected to ${haUrl}`, "ok");
    applyBtn.disabled = false;
    if (deviceSelect.value.trim()) {
      mountCards();
    }
  } catch (err) {
    setStatus(
      `Connection failed: ${err instanceof Error ? err.message : String(err)}`,
      "err",
    );
    applyBtn.disabled = true;
  }
}

applyBtn.addEventListener("click", () => mountCards());
deviceSelect.addEventListener("change", () => {
  if (deviceSelect.value.trim()) {
    mountCards();
  }
});
void connect();
