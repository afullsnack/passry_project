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

export function RegisterEventCard({ description }: { description: string }) {
  const { data: session } = useSession()

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
                    MF
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
          <Button>Buy Ticket</Button>
          <Button>Share Event</Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
