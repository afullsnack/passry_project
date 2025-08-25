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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSession } from '@/hooks/session'
import type { AnyFieldApi } from '@tanstack/react-form'
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
          >
            <span>Tickets</span>
            <Badge variant="secondary">
              Free <Edit />
            </Badge>
          </Button>
          <Button
            className="w-full flex items-center justify-between"
            variant="outline"
            size="sm"
          >
            <span>Capacity</span>
            <Badge variant="secondary">
              Unlimited <Edit />
            </Badge>
          </Button>
          <Button
            className="w-full flex items-center justify-between"
            variant="outline"
            size="sm"
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
