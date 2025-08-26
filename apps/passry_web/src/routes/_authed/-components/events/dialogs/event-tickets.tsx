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
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { X } from 'lucide-react'

interface IProps {
  name: string // form field name
  form: any
  defaultValue?: Array<{
    name: string
    price: number
    quantity: number
    saleStartDate: Date | undefined
    saleEndDate: Date | undefined
    isFree: boolean
  }>
}

export default NiceModal.create(({ name, form, defaultValue }: IProps) => {
  const modal = useModal()
  const [price, setPrice] = useState(0)

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
          mode="array"
          children={(field: AnyFieldApi) => (
            <>
              <Label>Event category</Label>
              <Tabs
                onValueChange={(value) => {
                  console.log('Value for ticket', value)
                  if (value === 'paid' && field.state.value.length === 1) {
                    field.handleChange([
                      {
                        name: 'Paid',
                        quantity: 0,
                        price,
                        saleStartDate: undefined,
                        saleEndDate: undefined,
                        isFree: false,
                      },
                    ])
                  } else if (
                    value === 'free' &&
                    field.state.value.length === 1
                  ) {
                    field.handleChange([
                      {
                        name: 'Free',
                        quantity: 0,
                        price: 0,
                        saleStartDate: undefined,
                        saleEndDate: undefined,
                        isFree: true,
                      },
                    ])
                  } else {
                    field.handleChange([
                      {
                        name: 'Free',
                        quantity: 0,
                        price: 0,
                        saleStartDate: undefined,
                        saleEndDate: undefined,
                        isFree: true,
                      },
                      {
                        name: 'Standard',
                        quantity: 0,
                        price,
                        saleStartDate: undefined,
                        saleEndDate: undefined,
                        isFree: false,
                      },
                    ])
                  }
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
                    <Input
                      placeholder="Enter amount"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.valueAsNumber)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="multi">
                  <div className="grid">
                    <div>Multiple type tickets.</div>
                    <span className="text-sm text-primary/80 w-full">
                      Split tickets into categories.
                    </span>
                    <div>
                      {field.state.value.map((_: any, i: number) => {
                        return (
                          <TicketItem key={i} form={form} i={i} field={field} />
                        )
                      })}
                      <Button
                        onClick={() =>
                          field.pushValue({
                            name: '',
                            price: 0,
                            quantity: 0,
                            saleEndDate: undefined,
                            saleStartDate: undefined,
                            isFree: true,
                          })
                        }
                        variant="outline"
                        type="button"
                        size="sm"
                        className="my-6"
                      >
                        Add New Ticket
                      </Button>
                    </div>
                  </div>
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

function TicketItem({ form, i, field }: any) {
  const trackIsFree = useStore(
    form.store,
    (state: any) => state?.values.tickets[i].isFree,
  )

  return (
    <div className="border border-gray-700 rounded-md p-4 my-4 border-dashed space-y-3">
      <div className="w-full flex items-center justify-end mx-3">
        <Button size="sm" variant="ghost" onClick={() => field.removeValue(i)}>
          <X className="size-4" />
        </Button>
      </div>
      <div className="grid gap-4">
        <form.Field name={`tickets[${i}].name`}>
          {(subField: AnyFieldApi) => (
            <div>
              <Label>Ticket name</Label>
              <Input
                value={subField.state.value}
                onBlur={subField.handleBlur}
                placeholder="Enter name of ticket"
                onChange={(e) => subField.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
        <form.Field name={`tickets[${i}].price`}>
          {(subField: AnyFieldApi) => (
            <div>
              <Label>Price</Label>
              <Input
                value={trackIsFree ? 0 : subField.state.value}
                type="number"
                placeholder="Enter price of ticket"
                onBlur={subField.handleBlur}
                onChange={(e) =>
                  subField.handleChange(
                    trackIsFree ? 0 : e.target.valueAsNumber,
                  )
                }
              />
            </div>
          )}
        </form.Field>
        <form.Field name={`tickets[${i}].quantity`}>
          {(subField: AnyFieldApi) => (
            <div>
              <Label>Quantity</Label>
              <Input
                onBlur={subField.handleBlur}
                type="number"
                defaultValue={0}
                onChange={(e) => subField.handleChange(e.target.valueAsNumber)}
              />
            </div>
          )}
        </form.Field>
        {!trackIsFree && (
          <>
            <form.Field name={`tickets[${i}].saleStartDate`}>
              {(subField: AnyFieldApi) => (
                <div>
                  <Label>Sale Start Date</Label>
                  <Input
                    onBlur={subField.handleBlur}
                    type="datetime-local"
                    onChange={(e) =>
                      subField.handleChange(e.target.valueAsDate!)
                    }
                  />
                </div>
              )}
            </form.Field>
            <form.Field name={`tickets[${i}].saleEndDate`}>
              {(subField: AnyFieldApi) => (
                <div>
                  <Label>Sale End Date</Label>
                  <Input
                    onBlur={subField.handleBlur}
                    type="datetime-local"
                    onChange={(e) =>
                      subField.handleChange(e.target.valueAsDate!)
                    }
                  />
                </div>
              )}
            </form.Field>
          </>
        )}
        <form.Field name={`tickets[${i}].isFree`}>
          {(subField: AnyFieldApi) => (
            <div className="flex items-center justify-between">
              <Label>Switch to free event</Label>
              <Switch
                checked={subField.state.value}
                onCheckedChange={(checked) => subField.handleChange(checked)}
              />
            </div>
          )}
        </form.Field>
      </div>
    </div>
  )
}
