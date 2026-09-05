import { defineConfig, type Plugin } from "vite";
import { resolve } from "node:path";
import { copyToWww } from "./scripts/copy-to-www.mjs";

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
