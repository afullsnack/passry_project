import { defineConfig } from "drizzle-kit";

import env from "@/env";

export default defineConfig({
  schema: env.NODE_ENV === "development"? "./src/db/schema" : "./dist/src/schema",
  out: env.NODE_ENV === "development"? "./src/db/migrations" : "./dist/src/db/migrations",
  dialect: env.NODE_ENV === "development" || env.NODE_ENV === "test"? "sqlite" : "turso",
  // @ts-ignore
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
