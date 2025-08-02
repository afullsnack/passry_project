import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
import {phoneNumberClient, emailOTPClient,customSessionClient} from "better-auth/client/plugins"
import type {AuthType} from "@passry/api/auth-type"

export const authClient = createAuthClient({
  baseURL: env.VITE_API_URL,

  plugins: [
    customSessionClient<AuthType>(),
    phoneNumberClient(),
    emailOTPClient()
  ]
})
