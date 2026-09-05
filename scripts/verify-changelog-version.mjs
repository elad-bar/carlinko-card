#!/usr/bin/env node
/**
 * Fail if package.json version has no Keep a Changelog section with
 * Added / Changed / Fixed content.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const version = pkg.version;
const text = readFileSync(resolve(root, "CHANGELOG.md"), "utf8");

const headerRe = /^## \[([^\]]+)\]/gm;
const matches = [...text.matchAll(headerRe)];
const idx = matches.findIndex((m) => m[1] === version);
if (idx < 0) {
  console.error(`No changelog section for package version ${version}`);
  process.exit(1);
}

const start = matches[idx].index + matches[idx][0].length;
const end = idx + 1 < matches.length ? matches[idx + 1].index : text.length;
const section = text.slice(start, end);

const hasCategory = /### (Added|Changed|Fixed)/.test(section);
const hasBullet = /^[ \t]*-/m.test(section);

if (!hasCategory || !hasBullet) {
  console.error(
    `Changelog section [${version}] must include Added/Changed/Fixed with at least one bullet`,
  );
  process.exit(1);
}

console.log(`OK: changelog covers ${version}`);
