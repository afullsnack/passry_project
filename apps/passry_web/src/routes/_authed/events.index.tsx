import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import ExploreCards from './-components/explore-cards'
import { Button } from '@/components/ui/button'
import { AlertCircleIcon, Plus } from 'lucide-react'
import CreateEventDialog from './-components/events/create-event-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useEvents } from '@/hooks/use-events'
import { useIsMobile } from '@/hooks/use-mobile'

export const Route = createFileRoute('/_authed/events/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: events, isLoading, error } = useEvents()
  const isMobile = useIsMobile()

  console.log('Events', events)
  return (
    <div className="flex flex-col gap-4 overflow-auto px-4 lg:px-6">
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
    </div>
  )
}
