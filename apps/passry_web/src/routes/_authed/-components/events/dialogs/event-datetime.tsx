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

interface IProps {
  name: string // form field name
  form: any
}

export default NiceModal.create(({ name, form }: IProps) => {
  const modal = useModal()
  const isMobile = useIsMobile()

  let timeout: NodeJS.Timeout | null = null
  const handleLongPress = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | TouchEvent) => {
      console.log('Mouse event', event)
      if (event.type === 'mousedown') {
        timeout = setTimeout(() => {
          alert('Waited 1 second')
        }, 2000)
        console.log(timeout, 'Timout object')
      }

      if (event.type === 'mouseup') {
        console.log(timeout, 'Timout object')
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
            name={name || 'title'}
            children={(field: AnyFieldApi) => (
              <>
                <Label>Event Date and Time</Label>
                <MiniCalendar
                  onValueChange={field.handleChange}
                  value={field.state.value}
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
