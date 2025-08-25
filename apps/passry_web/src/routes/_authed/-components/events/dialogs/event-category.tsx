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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface IProps {
  name: string // form field name
  form: any
  defaultValue?: string
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
            Pick a category for your event or create a new one.
          </DialogDescription>
        </DialogHeader>
        <form.Field
          name={name || 'title'}
          children={(field: AnyFieldApi) => (
            <>
              <Label>Event category</Label>
              <Select
                onValueChange={(value) => field.handleChange(value)}
                defaultValue={defaultValue}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        />
        <Button onClick={() => modal.hide()}>Set category</Button>
      </DialogContent>
    </Dialog>
  )
})
