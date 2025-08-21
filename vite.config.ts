// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  build: {
    lib: {
      name: "@marufme/device-key",
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "device-key",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    minify: true,
  },
});
