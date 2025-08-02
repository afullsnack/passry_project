import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./src/app.ts",
    "./src/lib/auth.ts",
    "./drizzle.config.ts",
    "./src/index.ts",
  ],
  format: ["esm", "cjs"],
  dts: true,
  outExtension({ format }) {
    return format === "esm" ? { js: ".mjs" } : { js: ".js" };
  },
});
