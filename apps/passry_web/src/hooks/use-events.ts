import { client } from "@/lib/api-client";import { useQuery } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono/client";

interface EventProps {
  orgId?: string;
  eventId?: string;
}

export function useEvents(props?: EventProps) {
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

export function useSingleEvent(props?: EventProps) {
  return useQuery({
    queryKey: ['event', 'single'],
    queryFn: async () => {
      try {
        const url = client.event[":id"].$url();
        console.log("Url", url.href.slice(0, url.href.lastIndexOf(':')))
        const response = await fetch(`${url.href.slice(0, url.href.lastIndexOf(':'))}${props?.eventId}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json()
        console.log("Result of event fetch", result)
        return result
      }
      catch(singleErr: any) {
        console.log("error", singleErr)
        throw new Error(singleErr.message || "Failed to get event")
      }
    },
  })
}
