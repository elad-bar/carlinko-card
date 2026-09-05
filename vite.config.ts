import { readFileSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import { resolve } from "node:path";
import { copyToWww } from "./scripts/copy-to-www.mjs";

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "package.json"), "utf8"),
) as { version: string };

function copyWwwPlugin(): Plugin {
  return {
    name: "carlinko-copy-www",
    closeBundle() {
      const dest = process.env.CARLINKO_WWW?.trim();
      if (!dest) {
        return;
      }
      try {
        copyToWww(dest);
      } catch (err) {
        this.warn(err instanceof Error ? err.message : String(err));
      }
    },
  };
}

export default defineConfig({
  plugins: [copyWwwPlugin()],
  define: {
    __CARD_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/carlinko-card.ts"),
      name: "CarlinkoCard",
      formats: ["es"],
      fileName: () => "carlinko-card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
