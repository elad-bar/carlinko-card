import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import { resolve } from "node:path";

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), "utf8"),
) as { version: string };

export default defineConfig({
  root: resolve(__dirname),
  envDir: resolve(__dirname),
  define: {
    __CARD_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
});
