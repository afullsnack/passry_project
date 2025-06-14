import { env } from "@/env";
import { createServerFn } from "@tanstack/react-start"


export const subscribe = createServerFn({
    method: 'POST',
    response: 'raw'
})
    .validator((data: {
        email: string;
        subscribed: boolean
        data?: Record<string, any> }) => data
    )
    .handler(async ({ data: functionData }) => {
        const { email, subscribed, data } = functionData
        const response = await fetch(`${env.PLUNK_API_URL}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.PLUNK_API_KEY}`,
          },
          body: JSON.stringify({ email, subscribed, data }),
        })
        if (response.ok) {
          throw new Error('Failed to subscribe')
        }
        const json = await response.json()
        console.log('JSON', json)
        if('code' in json && json.code !== 200) {
            throw new Error(json?.message)
        }
        return json;
    })
