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
import { Check, ChevronsUpDown, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

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
              <Tabs
                onValueChange={(value) => {
                  if (value === 'paid') {
                    field.handleChange([
                      {
                        name: 'Paid',
                        quantity: Infinity,
                        price,
                        saleStartDate: undefined,
                        saleEndDate: undefined,
                        isFree: false,
                      },
                    ])
                  } else if (value === 'free') {
                    field.handleChange([
                      {
                        name: 'Free',
                        quantity: Infinity,
                        price: 0,
                        saleStartDate: undefined,
                        saleEndDate: undefined,
                        isFree: true,
                      },
                    ])
                  } else {
                    field.handleChange([
                      {
                        name: 'Standard',
                        quantity: 0,
                        price: 0,
                        saleStartDate: undefined,
                        saleEndDate: undefined,
                        isFree: false,
                      },
                      {
                        name: 'VIP',
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
                  <div>
                    <span className="text-sm text-primary/80 w-full">
                      Free ticket.
                    </span>
                    {field.state.value.map((_: any, i: number) => {
                      return (
                        <TicketItem key={i} form={form} i={i} field={field} />
                      )
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="paid">
                  <div>
                    <span className="text-sm text-primary/80 w-full">
                      Create paid ticket.
                    </span>
                    {field.state.value.map((_: any, i: number) => {
                      return (
                        <TicketItem key={i} form={form} i={i} field={field} />
                      )
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="multi">
                  <div className="grid">
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
                            isFree: false,
                          })
                        }
                        variant="outline"
                        type="button"
                        size="sm"
                        className="my-4"
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
  const trackedTickets = useStore(
    form.store,
    (state: any) => state?.values.tickets,
  )

  return (
    <div className="border border-gray-700 rounded-md p-2 space-y-3 my-2 bg-primary-foreground">
      <div className="grid gap-1">
        <form.Field name={`tickets[${i}].name`}>
          {(subField: AnyFieldApi) => (
            <div className="flex">
              <Input
                value={subField.state.value}
                contentEditable={!trackIsFree}
                disabled={trackIsFree}
                onBlur={subField.handleBlur}
                placeholder="Enter name of ticket"
                className="text-xs border-none outline-0 px-3 !py-0 flex-1"
                onChange={(e) => subField.handleChange(e.target.value)}
              />
              {trackedTickets.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={trackIsFree}
                  onClick={() => {
                    if (trackedTickets.length === 2) {
                      return toast.warning('Multi must be at least 2', {
                        description:
                          'Use free or Paid to create single free or paid tickets',
                      })
                    }
                    field.removeValue(i)
                  }}
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
          )}
        </form.Field>
        <form.Field name={`tickets[${i}].price`}>
          {(subField: AnyFieldApi) => (
            <div>
              <PricePicker
                defaultValue={trackIsFree ? 0 : subField.state.value}
                disabled={trackIsFree}
                onValueChange={(value) => subField.handleChange(value)}
              />
            </div>
          )}
        </form.Field>
        <form.Field name={`tickets[${i}].quantity`}>
          {(subField: AnyFieldApi) => (
            <div>
              <QuantityPicker
                defaultValue={Infinity}
                onValueChange={(value) => subField.handleChange(value)}
              />
            </div>
          )}
        </form.Field>
      </div>
    </div>
  )
}

const defautlPrices = [0, 5000, 10000, 20000, 30000]
function PricePicker({
  defaultValue,
  disabled = false,
  onValueChange,
}: {
  defaultValue: number
  disabled: boolean
  onValueChange: (value: number) => void
}) {
  const [open, setOpen] = useState<boolean>()
  const [value, setValue] = useState<number>(defaultValue)
  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      {!disabled ? (
        <PopoverTrigger asChild>
          <Badge
            className="rounded-2xl lg:h-6 flex gap-3 justify-between capitalize"
            variant="secondary"
          >
            {typeof value !== 'undefined'
              ? '₦ ' + value.toString()
              : 'Select price...'}
            <ChevronsUpDown className="opacity-50" />
          </Badge>
        </PopoverTrigger>
      ) : (
        <Badge
          className="rounded-2xl lg:h-6 flex gap-3 justify-between capitalize"
          variant="secondary"
          onClick={() => {
            toast.info('Selection is disabled')
          }}
        >
          {typeof value !== 'undefined'
            ? '₦ ' + value.toString()
            : 'Select price...'}
          <ChevronsUpDown className="opacity-50" />
        </Badge>
      )}
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Add custom price..." className="h-9" />
          <CommandList>
            <CommandEmpty>Create new price.</CommandEmpty>
            <CommandGroup>
              {defautlPrices.map((price) => (
                <CommandItem
                  key={price}
                  value={price.toString()}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value.toString()
                        ? 0
                        : Number(currentValue), // deselect if value was previously selected
                    )
                    onValueChange(
                      currentValue === value.toString()
                        ? 0
                        : Number(currentValue),
                    )
                    setOpen(false)
                  }}
                >
                  ₦ {price}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === price ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const defaultQuantity = [Infinity, 50, 100, 200, 300]
function QuantityPicker({
  defaultValue,
  onValueChange,
}: {
  defaultValue: number
  onValueChange: (value: number) => void
}) {
  const [open, setOpen] = useState<boolean>()
  const [value, setValue] = useState<number>(defaultValue)
  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Badge
          className="rounded-2xl lg:h-6 flex gap-3 justify-between capitalize"
          variant="secondary"
        >
          {value && value === Infinity ? 'Unlimited' : value.toString()}
          <ChevronsUpDown className="opacity-50" />
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Add custom capacity..." className="h-9" />
          <CommandList>
            <CommandEmpty>Add capacity.</CommandEmpty>
            <CommandGroup>
              {defaultQuantity.map((price) => (
                <CommandItem
                  key={price}
                  value={price.toString()}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value.toString()
                        ? 0
                        : Number(currentValue), // deselect if value was previously selected
                    )
                    onValueChange(
                      currentValue === value.toString()
                        ? 0
                        : Number(currentValue),
                    )
                    setOpen(false)
                  }}
                >
                  {price}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === price ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
