import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/app.ts"],
  format: ["esm", "cjs"],
  dts: true,
  outExtension({ format }) {
    return format === "esm" ? { js: ".mjs" } : { js: ".cjs" };
  },
});
