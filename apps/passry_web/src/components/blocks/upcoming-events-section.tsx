import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Users } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Startup Pitch Battle',
    date: 'Sept 5, 2025',
    image: '/placeholder-ek0po.png',
    className: 'bg-gradient-to-br from-slate-800 to-slate-900',
  },
  {
    id: 2,
    title: 'Afro Music Night',
    date: 'Oct 3, 2025',
    price: '₦5,000',
    location: 'Lagos',
    image: '/afro-concert-silhouettes.png',
    className: 'bg-gradient-to-br from-red-600 to-orange-700',
    hasButton: true,
  },
  {
    id: 3,
    title: 'December Joyful Sound',
    date: 'Dec 28, 2025',
    image: '/microphone-soundwaves.png',
    className: 'bg-gradient-to-br from-blue-600 to-teal-600',
  },
]

export function UpcomingEventsSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Don't Miss These Upcoming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-0 h-full">
                <div className={`relative h-64 ${event.className}`}>
                  <img
                    src={event.image || '/placeholder.svg'}
                    alt={event.title}
                    className="object-cover mix-blend-overlay opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{event.date}</p>

                    <div className="flex w-full items-center justify-between">
                      {event.price && event.location && (
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold">
                              {event.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>
                      )}

                      {event.hasButton && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white text-gray-900 hover:bg-gray-100"
                        >
                          Get Ticket
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
