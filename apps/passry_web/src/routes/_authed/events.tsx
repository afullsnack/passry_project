import { createFileRoute, redirect } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/api-client'
import { authClient } from '@/lib/auth-client'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExploreCards from './-components/explore-cards'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import CreateEventDialog from './-components/events/create-event-dialog'
export const Route = createFileRoute('/_authed/events')({
  component: RouteComponent,
  loader: async (ctx) => {
    console.log('Header data in loader', ctx.route.options.headers)
    const { data: session } = await authClient.getSession()
    if (!session) {
      throw redirect({ to: '/login' })
    }
    const response = await client.event.$get()
    if (response.ok) {
      const events = await response.json()
      console.log('Events server side', events)
      return { events }
    }

    throw new Error('Could not get events')
    // const events = Array.from({ length: 8 }, () => ({
    //   id: Math.random().toString(16),
    //   date: '2-01-2025',
    //   title: 'Event one',
    //   price: '100',
    //   image: 'https://via.placeholder.com/150',
    // }))
  },
})

function RouteComponent() {
  const { events } = Route.useLoaderData()

  console.log('Events', events)
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div
          defaultValue="events"
          className="w-full flex-col justify-start gap-6"
        >
          <div className="flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <Input placeholder="Search" />
            </div>
            <CreateEventDialog
              openTrigger={
                <Button>
                  Create event <Plus />
                </Button>
              }
            />
          </div>
          <div className="flex flex-col gap-4 overflow-auto px-4 lg:px-6">
            <div className="overflow-hidden rounded-lg grid gap-4.5 border p-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
              {events.length ? (
                events.map((event) => (
                  <ExploreCards
                    key={event.id}
                    event={{
                      id: event.id,
                      date: event.dateTime!,
                      title: event.title,
                      price: '100',
                      image: event.coverUrl || '',
                    }}
                  />
                ))
              ) : (
                <div>No events found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
