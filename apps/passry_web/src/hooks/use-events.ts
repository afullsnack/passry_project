import { client } from "@/lib/api-client";import { useQuery } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono/client";


export function useEvents() {
  return useQuery<
    InferResponseType<typeof client.event.$get>,
    Error,
    InferRequestType<typeof client.event.$get>
  >({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await client.event.$get()
      const result = await response.json()
      return result
    },
  })
}
