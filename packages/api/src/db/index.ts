import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import env from "@/env";

import * as authSchema from "./schema/auth-schema";
import * as globalSchema from "./schema/global-schema";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, {
  schema: { ...globalSchema, ...authSchema }, // add schemas as app grows
});

export default db;
