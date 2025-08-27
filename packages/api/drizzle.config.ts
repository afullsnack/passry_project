import { defineConfig } from "drizzle-kit";

import env from "@/env";

export default defineConfig({
  schema: "./src/db/schema", // env.NODE_ENV === "development" ?  : "./dist/src/db/schema",
  out: env.NODE_ENV === "development" ? "./src/db/migrations" : "./src/db/prod/migrations",
  dialect: env.NODE_ENV === "development" ? "sqlite" : "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  breakpoints: env.NODE_ENV !== "development",
});
