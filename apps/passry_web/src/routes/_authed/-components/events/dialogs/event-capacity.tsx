import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useStore, type AnyFieldApi } from '@tanstack/react-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface IProps {
  name: string // form field name
  form: any
  defaultValue?: number
}

export default NiceModal.create(({ name, form, defaultValue }: IProps) => {
  const modal = useModal()
  const ticketsTracked = useStore(
    form.store,
    (state: any) => state?.values?.tickets,
  )

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => (open ? modal.show() : modal.hide())}
      modal
    >
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="text-start">
            Close registration when capacity is reached. Also pulls from ticket
            capacity.
          </DialogDescription>
        </DialogHeader>
        <form.Field
          name={name || 'title'}
          children={(field: AnyFieldApi) => (
            <>
              <Input
                onBlur={field.handleBlur}
                type="number"
                defaultValue={defaultValue}
                disabled={ticketsTracked.length > 1}
                onChange={(e) => {
                  const tickets = field.form.state.values.tickets
                  console.log(tickets, 'Tickets value')
                  if (tickets.length > 1) {
                    return
                  }
                  form.replaceFieldValue('tickets', 0, {
                    ...ticketsTracked[0],
                    quantity: e.target.valueAsNumber,
                  })
                  field.handleChange(e.target.valueAsNumber)
                }}
                placeholder="Enter event capacity"
                autoComplete="off"
              />
            </>
          )}
        />
        <Button onClick={() => modal.hide()}>Set Limit</Button>
      </DialogContent>
    </Dialog>
  )
})
