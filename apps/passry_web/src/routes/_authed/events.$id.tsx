import { cn } from '@/lib/utils'
import { env } from '@/env'
import { createFileRoute, useParams } from '@tanstack/react-router'
import {
  AlertCircleIcon,
  Calendar,
  Heart,
  Loader2Icon,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSingleEvent } from '@/hooks/use-events'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { formatDate } from '@/lib/date-formatter'
import { RegisterEventCard } from './-components/events/register-event'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_authed/events/$id')({
  component: RouteComponent,
  errorComponent: () => <div>An error occured</div>,
  notFoundComponent: () => <div>Page not found</div>,
})

function RouteComponent() {
  const { id } = useParams({ from: '/_authed/events/$id' })
  const {
    data: event,
    isLoading,
    error,
  } = useSingleEvent({
    eventId: id,
  })

  if (error) {
    return (
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
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2Icon className="size-6 animate-spin" />
      </div>
    )
  }

  const formattedDateTime = formatDate(
    (event as { dateTime: string }).dateTime,
    {
      format: 'EEEE, MMMM dd. hh:mm aa',
      smart: false,
      includeTime: true,
    },
  )

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div
          defaultValue="events"
          className="w-full flex-col justify-start gap-6 px-4 lg:px-6"
        >
          <div className="relative w-full">
            <div>
              <img
                src={`${env.VITE_API_URL}/upload?key=${event.coverUrlKey}`}
                className="h-[400px] bg-cover bg-center aspect-square rounded-lg mx-auto"
              />
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
          <div className="grid w-full gap-4 md:max-w-2xl py-4 lg:py-6 mx-auto">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold flex justify-between">
                {event?.title}
                <Badge className="rounded-2xl lg:h-6" variant="secondary">
                  {event?.category}
                </Badge>
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <span className="flex items-center gap-2">
                <div className="p-3 border border-primary/30 items-center justify-center rounded-xl">
                  <Calendar className="size-6" />{' '}
                </div>
                {formattedDateTime.split('.')[0]} <br />
                {formattedDateTime.split('.')[1]}
              </span>
              <span className="flex items-center gap-2">
                <div className="p-3 border border-primary/30 items-center justify-center rounded-xl">
                  <MapPin className="size-6" />{' '}
                </div>
                {(event as { country: string }).country},{' '}
                {(event as { city: string }).city}
                <br />
                {(event as { address: string }).address}
              </span>
            </div>
            <div></div>
            <RegisterEventCard
              description={event?.description}
              coverUrl={`${env.VITE_API_URL}/upload?key=${event.coverUrlKey}`}
              shareUrl={`${env.VITE_APP_URL}/e/${event?.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
