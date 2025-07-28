import { betterAuth } from "better-auth";
import env from "@/env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
import { phoneNumber, emailOTP } from "better-auth/plugins";
import * as globalSchema from "@/db/schema/global-schema";
import * as authSchema from "@/db/schema/auth-schema";
import { sendEmail } from "./email";


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
      enabled: false,
      clientId: ``,
      clientSecret: ``,
      clientKey: ``,
    },
    apple: {
      enabled: false,
      clientId: ``,
      clientSecret: ``,
      clientKey: ``
    },
    google: {
      enabled: false,
      clientId: ``,
      clientSecret: ``,
      clientKey: ``
    }
  },

  plugins: [
    phoneNumber(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type}) => {
        if(type === "sign-in") {
          console.log("Sending OTP to email:", email);
          console.log("OTP:", otp);

          await sendEmail({
            to: email,
            subject: "Verify New User Email",
            body: `Your OTP is ${otp}`,
          })
        }
      },
      sendVerificationOnSignUp: true,
      otpLength: 6,
      allowedAttempts: 3,
      storeOTP: "hashed"
    })
  ],
  trustedOrigins: ["http://localhost:3000"]
})
