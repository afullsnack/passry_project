import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart } from 'lucide-react'

interface IProps {
  event: {
    id: string
    title: string
    date: string
    price: string
    image: string
  }
}

export default function ExploreCards({ event }: IProps) {
  return (
    <Card
      key={event.id}
      className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <div
          className="h-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.image})` }}
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
              className={`h-4 w-4 ${true ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
          {event.title}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{event.date}</span>
          <div className="flex items-center gap-1">
            {event.price === 'Free' ? (
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                Free
              </Badge>
            ) : (
              <span className="font-semibold text-gray-900">{event.price}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
