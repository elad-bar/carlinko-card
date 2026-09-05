import { cpSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distJs = resolve(root, "dist", "carlinko-card.js");
const distMap = resolve(root, "dist", "carlinko-card.js.map");

/**
 * Copy built bundle into HA www path from CARLINKO_WWW.
 * @param {string} [destDir]
 */
export function copyToWww(destDir = process.env.CARLINKO_WWW?.trim()) {
  if (!destDir) {
    throw new Error(
      "CARLINKO_WWW is not set. Point it at your HA config www folder, e.g. " +
        "D:\\\\HA\\\\config\\\\www\\\\carlinko-card or /config/www/carlinko-card",
    );
  }
  if (!existsSync(distJs)) {
    throw new Error(`Missing ${distJs}. Run a build first.`);
  }
  mkdirSync(destDir, { recursive: true });
  cpSync(distJs, resolve(destDir, "carlinko-card.js"));
  if (existsSync(distMap)) {
    cpSync(distMap, resolve(destDir, "carlinko-card.js.map"));
  }
  console.log(`Copied carlinko-card.js → ${destDir}`);
}
