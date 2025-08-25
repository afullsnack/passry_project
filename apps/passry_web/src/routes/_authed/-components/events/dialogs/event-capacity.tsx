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

interface IProps {
  name: string // form field name
  form: any
  defaultValue?: number
}

export default NiceModal.create(({ name, form, defaultValue }: IProps) => {
  const modal = useModal()

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => (open ? modal.show() : modal.hide())}
      modal
    >
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="text-start">
            Close registration when capacity is reached
          </DialogDescription>
        </DialogHeader>
        <form.Field
          name={name || 'title'}
          children={(field: AnyFieldApi) => (
            <>
              <Label>Event title</Label>
              <Input
                onBlur={field.handleBlur}
                type="number"
                defaultValue={defaultValue}
                onChange={(e) => field.handleChange(e.target.value)}
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
