import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173
  },
  preview: {
    port: 4173
  },
  build: {
    target: "es2020",
    outDir: "dist"
  },
  test: {
    globals: true,
    environment: "node",
    setupFiles: "./vitest.setup.ts"
  }
});
