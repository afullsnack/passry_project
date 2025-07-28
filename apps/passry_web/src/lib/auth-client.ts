import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
import {phoneNumberClient} from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: env.VITE_API_URL,
  basePath: "/auth",

  plugins: [
    phoneNumberClient()
  ]
})
