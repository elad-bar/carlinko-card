#!/usr/bin/env node
/**
 * Build (and optionally watch) then copy dist into CARLINKO_WWW.
 * Usage:
 *   CARLINKO_WWW=/path/to/www/carlinko-card npm run deploy
 *   CARLINKO_WWW=/path/to/www/carlinko-card npm run deploy:watch
 */
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { copyToWww } from "./copy-to-www.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const www = process.env.CARLINKO_WWW?.trim();

if (!www) {
  console.error(
    "CARLINKO_WWW is required.\n" +
      "Example (Windows): set CARLINKO_WWW=D:\\\\HA\\\\config\\\\www\\\\carlinko-card\n" +
      "Example (Unix):    export CARLINKO_WWW=/mnt/ha/config/www/carlinko-card",
  );
  process.exit(1);
}

const watch = process.argv.includes("--watch");
const viteCli = resolve(root, "node_modules", "vite", "bin", "vite.js");
const viteArgs = [viteCli, "build", ...(watch ? ["--watch"] : [])];

const result = spawnSync(process.execPath, viteArgs, {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

if (result.status !== 0 && result.status !== null) {
  process.exit(result.status);
}

// One-shot: plugin may already have copied; copy again so deploy works
// even if the Vite plugin is skipped for any reason.
if (!watch) {
  try {
    copyToWww(www);
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
