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
import { createFileRoute } from '@tanstack/react-router'
import { AlertCircleIcon, Filter } from 'lucide-react'
import ExploreCards from './-components/explore-cards'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useEvents } from '@/hooks/use-events'

export const Route = createFileRoute('/_authed/explore')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: events, isLoading, error } = useEvents()
  const [tabValue, setTabValue] = useState('events')

  console.log('Events', events)
  console.log('Error', error)

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <Tabs
          defaultValue="events"
          value={tabValue}
          onValueChange={(value) => setTabValue(value)}
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
            <Select
              defaultValue="events"
              onValueChange={(value) => setTabValue(value)}
            >
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
              {isLoading && <h1>Fetching events...</h1>}
              {!isLoading && <ExploreCards events={events} />}
              {error && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Unable to fetch events.</AlertTitle>
                  <AlertDescription>
                    <p>Please verify your internet connection and try again.</p>
                    <ul className="list-inside list-disc text-sm">
                      <li>Check your WiFI or mobile data</li>
                      <li>Ensure sufficient bandwidth</li>
                      <li>Verify other apps can access the internet</li>
                    </ul>
                  </AlertDescription>
                </Alert>
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
