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
        const response = await fetch(`${env.PLUNK_API_URL}/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.PLUNK_API_KEY}`,
          },
          body: JSON.stringify({ event: 'subscribe-user', email, subscribed, data }),
        })
        if (!response.ok) {
            const json = await response.json()
            console.log('JSON', json)
            if('code' in json && json.code !== 200) {
                throw new Error(json?.message ?? 'Failed to subscribe')
            } else {
                throw new Error('Failed to subscribe')
            }
        }
        return await response.json();
    })
