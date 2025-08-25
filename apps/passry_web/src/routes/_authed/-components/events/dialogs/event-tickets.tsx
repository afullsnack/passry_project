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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
            Accept payments for access to your event.
          </DialogDescription>
        </DialogHeader>
        <form.Field
          name={name || 'title'}
          children={(field: AnyFieldApi) => (
            <>
              <Label>Event category</Label>
              <Tabs
                onValueChange={(value) => {
                  console.log('Value for ticket', value)
                  field.handleChange(value)
                }}
              >
                <TabsList>
                  <TabsTrigger value="free">Free</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                  <TabsTrigger value="multi">Multi</TabsTrigger>
                </TabsList>
                <TabsContent value="free">
                  <div>Free tickets</div>
                </TabsContent>
                <TabsContent value="paid">
                  <div>
                    <Input placeholder="Enter amount" type="number" />
                  </div>
                </TabsContent>
                <TabsContent value="multi">
                  <div>Multiple type tickets.</div>
                  <p>
                    Break down your tickets into different types, such as
                    general admission, VIP, or student tickets. This allows you
                    to offer various levels of access and pricing options to
                    your attendees.
                  </p>
                </TabsContent>
              </Tabs>
            </>
          )}
        />
        <Button onClick={() => modal.hide()}>Update tickets</Button>
      </DialogContent>
    </Dialog>
  )
})
