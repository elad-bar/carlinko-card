#!/usr/bin/env node
/**
 * Print the Keep a Changelog section body for a given semver (for GitHub Releases).
 * Usage: node scripts/extract-changelog-section.mjs <version>
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const changelogPath = resolve(root, "CHANGELOG.md");
const version = process.argv[2];

if (!version) {
  console.error("Usage: extract-changelog-section.mjs <version>");
  process.exit(1);
}

const text = readFileSync(changelogPath, "utf8");
const headerRe = /^## \[([^\]]+)\]/gm;
const matches = [...text.matchAll(headerRe)];
const idx = matches.findIndex((m) => m[1] === version);
if (idx < 0) {
  console.error(`No changelog section for version ${version}`);
  process.exit(1);
}

const start = matches[idx].index + matches[idx][0].length;
const end =
  idx + 1 < matches.length ? matches[idx + 1].index : text.length;
const body = text.slice(start, end).replace(/^\s*\n/, "").trim();
if (!body) {
  console.error(`Changelog section for ${version} is empty`);
  process.exit(1);
}
process.stdout.write(body + "\n");
