import { defineConfig } from "drizzle-kit";

import env from "@/env";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: env.NODE_ENV === "development" || env.NODE_ENV === "test"? "sqlite" : "turso",
  // @ts-ignore
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
