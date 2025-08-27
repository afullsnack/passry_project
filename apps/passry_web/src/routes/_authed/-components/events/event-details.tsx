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
import { useStore } from '@tanstack/react-form'
import type { AnyFieldApi } from '@tanstack/react-form'
import { Edit } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import {
  IconBrandFacebook,
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandInstagramFilled,
  IconBrandTelegram,
  IconBrandWhatsappFilled,
} from '@tabler/icons-react'

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

  const ticketsTracked = useStore(
    form.store,
    (state: any) => state?.values?.tickets,
  )
  const communityTracked: Array<any> = useStore(
    form.store,
    (state: any) => state?.values?.community,
  )

  // const capacityTracked = useStore(
  //   form.store,
  //   (state: any) => state?.values?.capacity,
  // )

  const showEventTicketsModal = () => {
    NiceModal.show(EventTicketsModal, {
      name: 'tickets',
      form,
      defaultValue: ticketsTracked || [
        {
          name: 'Free',
          price: 0,
          quantity: Infinity,
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
      defaultValue: Infinity,
    })
  }
  const showEventCommunityModal = () => {
    NiceModal.show(EventCommunityModal, {
      name: 'community',
      form,
      defaultValue: [
        {
          link: '',
          id: 'whatsapp',
        },
        {
          link: '',
          id: 'telegram',
        },
        {
          link: '',
          id: 'facebook',
        },
        {
          link: '',
          id: 'instagram',
        },
      ],
    })
  }

  const getSocialCommunityUpdates = useCallback(() => {
    const withLink = communityTracked.filter(({ link }) => !!link)
    if (!withLink.length) return 'Social icons'
    return withLink.map(({ id }) => {
      if (id === 'whatsapp') return <IconBrandWhatsappFilled />
      if (id === 'telegram') return <IconBrandTelegram />
      if (id === 'instagram') return <IconBrandInstagramFilled />
      if (id === 'facebook') return <IconBrandFacebookFilled />
    })
  }, [communityTracked])

  const getTotalCapacity = useCallback(() => {
    if (ticketsTracked.length > 1) {
      const totalCapacity = ticketsTracked.reduce(
        (acc: number, ticket: any) => acc + ticket.quantity,
        0,
      )
      return totalCapacity
    } else {
      return ticketsTracked[0]?.quantity === Infinity
        ? 'Unlimited'
        : ticketsTracked[0]?.quantity
    }
  }, [ticketsTracked])

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
            disabled={ticketsTracked.length > 1}
            onClick={showEventCapacityModal}
          >
            <span>Capacity</span>
            <Badge variant="secondary">
              {getTotalCapacity()} <Edit />
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
              {getSocialCommunityUpdates()} <Edit />
            </Badge>
          </Button>
        </div>
        <CardFooter className="w-full flex gap-4 px-0">
          <Button
            onClick={() => {
              console.log('This is being clikced')
              form.handleSubmit()
            }}
          >
            Publish Event
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
