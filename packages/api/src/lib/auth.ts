import { betterAuth } from "better-auth";
import env from "@/env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
import { phoneNumber } from "better-auth/plugins";
import * as globalSchema from "@/db/schema/global-schema";
import * as authSchema from "@/db/schema/auth-schema";


export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,

  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {...authSchema, ...globalSchema } // add schemas as app grows
  }),

  // Email password
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    facebook: {
      clientId: ``,
      clientSecret: ``,
      clientKey: ``,
    },
    apple: {
      clientId: ``,
      clientSecret: ``,
      clientKey: ``
    },
    google: {
      clientId: ``,
      clientSecret: ``,
      clientKey: ``
    }
  },

  plugins: [
    phoneNumber(),
  ]
})
