import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import EventTicketsModal from './dialogs/event-tickets'
import EventCapacityModal from './dialogs/event-capacity'
import EventCommunityModal from './dialogs/event-community'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSession } from '@/hooks/session'
import NiceModal from '@ebay/nice-modal-react'
import { useStore, type AnyFieldApi } from '@tanstack/react-form'
import { Edit } from 'lucide-react'
import { useEffect, useState } from 'react'

export function EventDetailsCard({
  description,
  fieldNames,
  form,
}: {
  description: string
  fieldNames: Array<string>
  form: any
}) {
  const { data: session } = useSession()
  const [orgName, setOrgName] = useState<Array<string>>(['Default'])

  useEffect(() => {
    if (session?.org) {
      setOrgName(session.org.name.split(' '))
    }
  }, [session])

  const showEventTicketsModal = () => {
    NiceModal.show(EventTicketsModal, {
      name: 'tickets',
      form,
      defaultValue: [
        {
          name: 'Free',
          price: 0,
          quantity: 0,
          saleStartDate: undefined,
          saleEndDate: undefined,
          isFree: true,
        },
      ],
    })
  }
  const showEventCapacityModal = () => {
    NiceModal.show(EventCapacityModal, {
      name: 'capacity',
      form,
      defaultValue: 50,
    })
  }
  const showEventCommunityModal = () => {
    NiceModal.show(EventCommunityModal, {
      name: 'community',
      form,
      defaultValue: 'whatsapp',
    })
  }

  const ticketsTracked = useStore(
    form.store,
    (state: any) => state?.values?.tickets,
  )

  console.log(ticketsTracked, ':::Tracked tickets')

  return (
    <Card className="bg-none">
      <CardContent className="bg-none">
        <CardTitle>Event details</CardTitle>
        <CardDescription>
          Add event description, tickets and capacity.
          <div className="flex items-center justify-start gap-3">
            Event created by{' '}
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="size-6 items-center justify-center">
                  <AvatarFallback className="text-xs items-center justify-center">
                    {orgName.length > 1
                      ? orgName[0].charAt(0).toUpperCase() +
                        orgName[1].charAt(0).toUpperCase()
                      : orgName[0].charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{session?.org?.name || 'Name of organization'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardDescription>
        <div className="my-10 space-y-4">
          <form.Field
            name={fieldNames[0] || 'title'}
            children={(field: AnyFieldApi) => (
              <>
                <Label className="text-[16px] font-medium text-primary/90">
                  About event
                </Label>
                <Textarea
                  rows={4}
                  onBlur={field.handleBlur}
                  placeholder={description}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          />

          {/* Event tickets default free, capacity,  */}
          <Button
            className="w-full flex items-center justify-between"
            variant="outline"
            size="sm"
            onClick={showEventTicketsModal}
          >
            <span>Tickets</span>
            <Badge variant="secondary">
              {ticketsTracked[0]?.name || 'Free'} <Edit />
            </Badge>
          </Button>
          <Button
            className="w-full flex items-center justify-between"
            variant="outline"
            size="sm"
            onClick={showEventCapacityModal}
          >
            <span>Capacity</span>
            <Badge variant="secondary">
              {ticketsTracked[0]?.quantity === 0 && 'Unlimited'} <Edit />
            </Badge>
          </Button>
          <Button
            className="w-full flex items-center justify-between"
            variant="outline"
            size="sm"
            onClick={showEventCommunityModal}
          >
            <span>Communities</span>
            <Badge variant="secondary">
              Social icons <Edit />
            </Badge>
          </Button>
        </div>
        <CardFooter className="w-full flex gap-4 px-0">
          <Button>Publish Event</Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
