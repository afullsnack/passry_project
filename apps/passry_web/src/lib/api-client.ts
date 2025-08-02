import {hc} from "hono/client"
import type { AppType } from "@passry/api/app-type"
import {env} from "@/env"

export const client = hc<AppType>(env.VITE_API_URL, {
  init: {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  }
});
