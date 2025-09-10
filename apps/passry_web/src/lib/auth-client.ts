import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
import {customSessionClient, emailOTPClient,multiSessionClient, phoneNumberClient, twoFactorClient} from "better-auth/client/plugins"
import type {AuthType} from "@passry/api/auth-type"

export const authClient = createAuthClient({
  baseURL: env.VITE_API_URL,

  plugins: [
    customSessionClient<AuthType>(),
    phoneNumberClient(),
    emailOTPClient(),
    multiSessionClient(),
    twoFactorClient()
  ]
})
