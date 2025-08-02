import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { IconPlus } from '@tabler/icons-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Filter } from 'lucide-react'
import ExploreCards from './-components/explore-cards'
import { client } from '@/lib/api-client'
// import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/_authed/explore')({
  component: RouteComponent,
  loader: async () => {
    // const { data: session } = await authClient.getSession()
    // if (!session) {
    //   throw redirect({ to: '/login' })
    // }
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
        <Tabs
          defaultValue="events"
          className="w-full flex-col justify-start gap-6"
        >
          <div className="flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <Input placeholder="Search" />
              <Button size="icon" variant="outline">
                <Filter className="size-4" />
              </Button>
            </div>
            <Label htmlFor="view-selector" className="sr-only">
              View
            </Label>
            <Select defaultValue="events">
              <SelectTrigger
                className="flex w-fit @4xl/main:hidden"
                size="sm"
                id="view-selector"
              >
                <SelectValue placeholder="Select a view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="organizers">Organizers</SelectItem>
                <SelectItem value="liked">Liked</SelectItem>
                <SelectItem value="my-tickets">My Tickets</SelectItem>
              </SelectContent>
            </Select>
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="organizers">
                Organizers <Badge variant="secondary">0</Badge>
              </TabsTrigger>
              <TabsTrigger value="liked">
                Liked <Badge variant="secondary">0</Badge>
              </TabsTrigger>
              <TabsTrigger value="my-tickets">
                My Tickets <Badge variant="secondary">0</Badge>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="events"
            className="flex flex-col gap-4 overflow-auto px-4 lg:px-6"
          >
            <div className="overflow-hidden rounded-lg grid gap-4.5 border p-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
              {events.length ? (
                events.map((event) => (
                  <Link to={'/e/$id'} params={{ id: event.id }}>
                    <ExploreCards
                      key={event.id}
                      event={{
                        id: event.id,
                        date: event.dateTime,
                        title: event.title,
                        price: '100',
                        image: event.coverUrl,
                      }}
                    />
                  </Link>
                ))
              ) : (
                <div>No events found</div>
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="organizers"
            className="flex flex-col px-4 lg:px-6"
          >
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
          </TabsContent>
          <TabsContent value="liked" className="flex flex-col px-4 lg:px-6">
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
          </TabsContent>
          <TabsContent
            value="my-tickets"
            className="flex flex-col px-4 lg:px-6"
          >
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
