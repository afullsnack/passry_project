import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { MapPin, Calendar, Ticket, Signal, Heart, Search } from 'lucide-react'
import { PiMoney } from 'react-icons/pi'

const canDoList = {
  forOrganizers: [
    {
      id: 1,
      title: 'Create Events Instantly',
      subTitle: 'Launch your event in minutes with our guided setup flow.',
      icon: <Calendar className="size-5" />,
      className: 'bg-gradient-to-br from-slate-800 to-slate-900',
    },
    {
      id: 2,
      title: 'Generate Digital Tickets',
      subTitle: 'Secure and scannable tickets with custom QR codes.',
      icon: <Ticket className="size-5" />,
      className: 'bg-gradient-to-br from-slate-800 to-slate-900',
    },
    {
      id: 3,
      title: 'Track Sales & Attendance',
      subTitle: 'Real-time analytics for your event performance.',
      icon: <Signal className="size-5" />,
      className: 'bg-gradient-to-br from-slate-800 to-slate-900',
    },
  ],
  forAttendees: [
    {
      id: 1,
      title: 'Discover Events Near You',
      subTitle: 'Explore a curated list of upcoming events in your area.',
      icon: <Search className="size-5" />,
      className: 'bg-white',
    },
    {
      id: 2,
      title: 'Buy Tickets Security',
      subTitle: 'Fast and safe payment with instant ticket delivery.',
      icon: <PiMoney className="size-5" />,
      className: 'bg-white',
    },
    {
      id: 3,
      title: 'Save or Share Events',
      subTitle: 'Bookmark your favorite events or invite friends.',
      icon: <Heart className="size-5" />,
      className: 'bg-white',
    },
  ],
}

export function CandoSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-balance font-bold text-center text-gray-900 mb-12">
          What You Can Do With Passry
        </h2>

        <div>
          <h1 className="text-xl font-medium mb-3">For Organizers</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {canDoList.forOrganizers.map((org) => (
              <Card
                key={org.id}
                className={cn(
                  'overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-0',
                  'bg-[#00BCD4]/20 hover:bg-white border-2 border-[#00BCD4]/20',
                )}
              >
                <CardContent className="p-0 h-full">
                  <div className={`relative h-52`}>
                    <div className="absolute inset-0 " />

                    <div className="absolute grid gap-2 bottom-0 left-0 right-0 top-0 p-6 text-black">
                      {org.icon}
                      <h3 className="text-xl font-bold mb-2">{org.title}</h3>
                      <p className="text-lg opacity-90 mb-3">{org.subTitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h1 className="text-xl font-medium mb-3">For Attendees</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {canDoList.forAttendees.map((att) => (
              <Card
                key={att.id}
                className={cn(
                  'overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-0',
                  'bg-[#00BCD4]/20 hover:bg-white border-2 border-[#00BCD4]/20',
                )}
              >
                <CardContent className="p-0 h-full">
                  <div className={`relative h-52`}>
                    <div className="absolute inset-0" />

                    <div className="absolute grid gap-2 bottom-0 left-0 right-0 top-0 p-6 text-black">
                      {att.icon}
                      <h3 className="text-xl font-bold mb-2">{att.title}</h3>
                      <p className="text-lg opacity-90 mb-3">{att.subTitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
