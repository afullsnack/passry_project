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
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandWhatsapp,
} from '@tabler/icons-react'

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
            Add attendees to your online community.
          </DialogDescription>
        </DialogHeader>
        <form.Field
          name={name || 'title'}
          children={(field: AnyFieldApi) => (
            <>
              <Label>Community</Label>
              <Tabs>
                <TabsList>
                  <TabsTrigger value="whatsapp">
                    <IconBrandWhatsapp />
                  </TabsTrigger>
                  <TabsTrigger value="telegram">
                    <IconBrandTelegram />
                  </TabsTrigger>
                  <TabsTrigger value="instagram">
                    <IconBrandInstagram />
                  </TabsTrigger>
                  <TabsTrigger value="facebook">
                    <IconBrandFacebook />
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="whatsapp">
                  <div>
                    <Input
                      placeholder="Enter whatsapp community link"
                      type="text"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="telegram">
                  <div>
                    <Input
                      placeholder="Enter telegram community link"
                      type="text"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="instagram">
                  <div>
                    <Input
                      placeholder="Enter instgram community link"
                      type="text"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="facebook">
                  <div>
                    <Input
                      placeholder="Enter facebook community link"
                      type="text"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        />
        <Button onClick={() => modal.hide()}>Update community</Button>
      </DialogContent>
    </Dialog>
  )
})
