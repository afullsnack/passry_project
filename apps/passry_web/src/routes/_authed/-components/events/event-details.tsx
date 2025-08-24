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
import { useEffect, useState } from 'react'

export function EventDetailsCard({ description }: { description: string }) {
  const { data: session } = useSession()
  const [orgName, setOrgName] = useState<Array<string>>(['Default'])

  useEffect(() => {
    if (session?.org) {
      setOrgName(session.org.name.split(' '))
    }
  }, [session])

  return (
    <Card className="bg-none">
      <CardContent className="bg-none">
        <CardTitle>Event details</CardTitle>
        <CardDescription>
          Add event details such as description, tickets and capacity and
          organzation hosting the event.
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
          <Button>Create Ticket</Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
