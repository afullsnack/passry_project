import { Button } from '@/components/ui/button'
import { env } from '@/env'
import { client } from '@/lib/api-client'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { createFileRoute, redirect, useParams } from '@tanstack/react-router'
import { Calendar, Clock, Heart } from 'lucide-react'

export const Route = createFileRoute('/_authed/e/$id')({
  component: RouteComponent,
  loader: async (ctx) => {
    const eventId = ctx.params.id
    const { data: session } = await authClient.getSession()
    if (!session) {
      throw redirect({ to: '/login' })
    }
    const response = await client.event[':id'].$get({
      param: { id: eventId },
    })
    if (response.ok) {
      const event = await response.json()
      console.log('Event server side', event)
      return event
    }

    throw new Error('Could not get events')
  },
  errorComponent: () => <div>An error occured</div>,
  notFoundComponent: () => <div>Page not found</div>,
})

function RouteComponent() {
  const event: any = Route.useLoaderData()

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div
          defaultValue="events"
          className="w-full flex-col justify-start gap-6 px-4 lg:px-6"
        >
          <div className="relative w-full">
            <div
              className="h-[400px] bg-cover bg-center w-full border border-dashed border-gray-400 rounded-lg"
              style={{
                backgroundImage: `url(${env.VITE_API_URL}/upload?key=${event.coverUrlKey})`,
              }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  // toggleFavorite(event.id)
                }}
              >
                <Heart
                  className={cn(`h-4 w-4`, {
                    'fill-red-500 text-red-500': false,
                    'text-white': true,
                  })}
                />
              </Button>
            </div>
          </div>

          {/* Event details */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <span className="flex items-center justify-center gap-2">
                <Clock />{' '}
                {new Date((event as { dateTime: Date }).dateTime).getTime()}
              </span>
              <span className="flex items-center justify-center gap-2">
                <Calendar />{' '}
                {new Date((event as { dateTime: string }).dateTime).getDate()}
              </span>
            </div>
          </div>
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}
