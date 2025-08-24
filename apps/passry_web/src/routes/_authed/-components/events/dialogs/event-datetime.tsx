import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import type { AnyFieldApi } from '@tanstack/react-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from '@/components/ui/shadcn-io/mini-calendar'
import { useIsMobile } from '@/hooks/use-mobile'
import { useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

interface IProps {
  name: string // form field name
  form: any
  defaultStateDate?: Date
}

export default NiceModal.create(({ name, form, defaultStateDate }: IProps) => {
  const modal = useModal()
  const isMobile = useIsMobile()

  let timeout: NodeJS.Timeout | null = null
  const handleLongPress = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | TouchEvent) => {
      if (event.type === 'mousedown') {
        timeout = setTimeout(() => {
          alert('Waited 1 second')
        }, 2000)
      }

      if (event.type === 'mouseup') {
        if (timeout !== null) {
          console.log('Cleared')
          clearTimeout(timeout)
        }
      }

      return () => {
        if (timeout) clearTimeout(timeout)
      }
    },
    [],
  )
  const calendarDayRef = useRef<HTMLButtonElement | any>(null)

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => (open ? modal.show() : modal.hide())}
      modal
    >
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogDescription>
            Set the start and end time for your event.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <form.Field
            name={name || 'fieldName'}
            children={(field: AnyFieldApi) => (
              <>
                <Label>Event Date and Time</Label>
                <MiniCalendar
                  onValueChange={(date) => {
                    console.log('Date selected:', date)
                    field.handleChange(date)
                  }}
                  value={field.state.value}
                  defaultStartDate={defaultStateDate}
                  days={isMobile ? 3 : 5}
                  className="flex items-center justify-around w-full"
                >
                  <MiniCalendarNavigation direction="prev" />
                  <MiniCalendarDays>
                    {(date) => (
                      <MiniCalendarDay
                        size="sm"
                        className="text-lg"
                        ref={calendarDayRef}
                        onMouseDown={(e) => handleLongPress(e)}
                        onMouseUp={(e) => handleLongPress(e)}
                        date={date}
                        key={date.toISOString()}
                      />
                    )}
                  </MiniCalendarDays>
                  <MiniCalendarNavigation direction="next" />
                </MiniCalendar>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="10:30:00"
                  onChange={(e) => {
                    console.log('Time selected', e.target.valueAsDate)
                    const prevDate = field.state.value as Date
                    const newDate = new Date(
                      prevDate.setHours(
                        e.target.valueAsDate?.getHours() || 0,
                        e.target.valueAsDate?.getMinutes() || 0,
                        e.target.valueAsDate?.getSeconds() || 0,
                        e.target.valueAsDate?.getMilliseconds() || 0,
                      ),
                    )
                    field.handleChange(newDate)
                    console.log('New date time', newDate)
                  }}
                  className={cn(
                    'bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none',
                    '!text-3xl font-sans font-semibold size-[35%] mx-auto items-center justify-center',
                  )}
                />
              </>
            )}
          />
          <Button className="w-full" onClick={() => modal.hide()}>
            Set date and time
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
})
