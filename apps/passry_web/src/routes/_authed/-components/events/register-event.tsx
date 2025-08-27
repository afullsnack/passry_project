import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSession } from '@/hooks/session'
import NiceModal from '@ebay/nice-modal-react'
import ShareModal from './dialogs/share-events'
import BuyTicketsModal from './dialogs/buy-tickets'
import { useEffect, useState } from 'react'

export function RegisterEventCard({
  description,
  coverUrl,
  shareUrl,
}: {
  description: string
  coverUrl: string
  shareUrl: string
}) {
  const { data: session } = useSession()
  const [orgName, setOrgName] = useState<Array<string>>(['Default'])

  useEffect(() => {
    if (session?.org) {
      setOrgName(session.org.name.split(' '))
    }
  }, [session])

  const showShareDialog = async () => {
    try {
      await navigator.share({
        title: 'An awesome event',
        text: 'Check out this awesome event!',
        url: shareUrl,
      })
      console.log('Content shared successfully')
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Sharing cancelled by user')
      } else {
        console.error('Error sharing content:', error)
      }
    }
    NiceModal.show(ShareModal, {
      eventCoverUrl: coverUrl,
      eventShareUrl: shareUrl,
    })
  }
  const buyTicketsDialog = () => {
    NiceModal.show(BuyTicketsModal)
  }

  return (
    <Card className="bg-none">
      <CardContent className="bg-none">
        <CardTitle>Registration</CardTitle>
        <CardDescription>
          Register for this event to gain access to exclusive content and
          networking opportunities.
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
        <div className="my-10">
          <h1 className="text-lg font-medium text-primary/70">About event</h1>
          <span>{description}</span>
        </div>
        <CardFooter className="w-full flex gap-4 px-0">
          <Button onClick={buyTicketsDialog}>Buy Ticket</Button>
          <Button onClick={showShareDialog}>Share Event</Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
