import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useStore } from '@tanstack/react-form'
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
  defaultValue?: Array<{
    link: string
    id: string
  }>
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
          mode="array"
          children={(field: AnyFieldApi) => (
            <>
              <Label>Community</Label>
              <Tabs>
                <TabsList>
                  {defaultValue?.map(({ id }: any, i: number) => (
                    <TabsTrigger key={i} value={id || 'whatsapp'}>
                      {id === 'whatsapp' && <IconBrandWhatsapp />}
                      {id === 'telegram' && <IconBrandTelegram />}
                      {id === 'instagram' && <IconBrandInstagram />}
                      {id === 'facebook' && <IconBrandFacebook />}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {field.state.value.map(({ id }: any, i: number) => (
                  <form.Field key={id} name={`community[${i}].link`}>
                    {(subField: AnyFieldApi) => (
                      <TabsContent value={id || 'whatsapp'}>
                        <div>
                          <Input
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            placeholder={`Enter ${id} community link`}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            type="text"
                          />
                        </div>
                      </TabsContent>
                    )}
                  </form.Field>
                ))}
              </Tabs>
            </>
          )}
        />
        <Button onClick={() => modal.hide()}>Update community</Button>
      </DialogContent>
    </Dialog>
  )
})
