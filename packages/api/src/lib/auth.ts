import type { BetterAuthOptions } from "better-auth";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession, emailOTP, phoneNumber } from "better-auth/plugins";

import db from "@/db";
import * as appSchema from "@/db/schema/app-schema";
import * as authSchema from "@/db/schema/auth-schema";
import * as globalSchema from "@/db/schema/global-schema";
import env from "@/env";

import { sendEmail } from "./email";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",

  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { ...authSchema, ...globalSchema, ...appSchema }, // add schemas as app grows
  }),

  // Email password
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    facebook: {
      enabled: false,
      clientId: ``,
      clientSecret: ``,
      clientKey: ``,
    },
    apple: {
      enabled: false,
      clientId: ``,
      clientSecret: ``,
      clientKey: ``,
    },
    google: {
      enabled: false,
      clientId: ``,
      clientSecret: ``,
      clientKey: ``,
    },
  },

  plugins: [
    customSession(async ({ user, session }) => {
      const org = await db.query.organization.findFirst({
        where(fields, operators) {
          return operators.eq(fields.ownerId, user.id);
        },
      }).catch((error: any) => {
        console.log("error fetching org", error);
        return undefined;
      });

      if (!org) {
        return {
          user,
          session,
        };
      }

      return {
        org,
        user: {
          ...user,
          orgId: org.id,
        },
        session,
      };
    }),
    phoneNumber(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        if (type === "email-verification") {
          console.warn("Sending OTP to email:", email);
          console.warn("OTP:", otp);

          await sendEmail({
            to: email,
            subject: "Verify New User Email",
            body: `Your OTP is ${otp}`,
          });
        }
      },
      sendVerificationOnSignUp: true,
      otpLength: 6,
      storeOTP: "hashed",
    }),
  ],
  trustedOrigins: ["*", "http://localhost:3000", "https://passry.com", "https://www.passry.com"],
  advanced: {
    cookies: {
      session_token: {
        attributes: {
          sameSite: env.NODE_ENV === "development" ? "Lax" : "Lax",
          secure: env.NODE_ENV !== "development",
          domain: env.NODE_ENV === "development" ? "localhost" : ".passry.com",
          httpOnly: true,
          maxAge: 3600,
          path: "/",
          partitioned: env.NODE_ENV !== "development"
        },
      },
    },
  },
} satisfies BetterAuthOptions);

export type AuthType = typeof auth;
