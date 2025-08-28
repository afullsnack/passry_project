import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { env } from '@/env'
import { formatDate } from '@/lib/date-formatter'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Heart, Ticket } from 'lucide-react'
import { useState } from 'react'

interface IProps {
  events: Array<{
    id: string
    title: string
    dateTime: string
    price: string
    coverUrl: string
    coverUrlKey: string
  }>
}

export default function ExploreCards({ events }: IProps) {
  const [liked, setLiked] = useState(false)

  if (!events.length) {
    return (
      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent>
          <h1>No events at this time</h1>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {events.map((event) => (
        <Link to={'/events/$id'} params={{ id: event.id }} key={event.id}>
          <Card
            key={event.id}
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow !p-0"
          >
            <div className="relative">
              {/*<div
                className="h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${env.VITE_API_URL}/upload?key=${event.coverUrlKey})`,
                }}
              >*/}
              <img
                src={`${env.VITE_API_URL}/upload?key=${event.coverUrlKey}`}
                className="h-40 bg-cover bg-center rounded-lg mx-auto"
              />
              <div className="absolute inset-0 bg-black/20" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setLiked((_prevLiked) => !_prevLiked)
                }}
              >
                <Heart
                  className={cn(`h-4 w-4 text-white`, {
                    'fill-red-500 text-red-500': liked,
                  })}
                />
              </Button>
              {/*</div>*/}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold dark:text-gray-300 mb-2 line-clamp-1">
                {event.title}
              </h3>
              <div className="flex items-center justify-between text-sm">
                <span className="dark:text-gray-400">
                  {formatDate(event.dateTime)}
                </span>
                <div className="flex items-center gap-1">
                  {event.price === 'Free' ? (
                    <Badge
                      variant="secondary"
                      className="text-green-600 bg-green-50"
                    >
                      Free
                    </Badge>
                  ) : (
                    <span className="font-semibold text-gray-900 dark:text-gray-400 flex items-center justify-center gap-2">
                      <Ticket className="size-4 -rotate-45" />
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}
