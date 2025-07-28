import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, phoneNumber } from "better-auth/plugins";

import db from "@/db";
import * as authSchema from "@/db/schema/auth-schema";
import * as globalSchema from "@/db/schema/global-schema";
import env from "@/env";

import { sendEmail } from "./email";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",

  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { ...authSchema, ...globalSchema }, // add schemas as app grows
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
  trustedOrigins: ["*", "http://localhost:3000"],
});
