import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { useSession } from '@/hooks/session'
import { client } from '@/lib/api-client'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { useForm, useStore } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

interface IProps {
  openTrigger: React.ReactNode
}

export default function CreateEventDialog({ openTrigger }: IProps) {
  const [step, setStep] = useState(0)
  const [orgFormOpen, setOrgFormOpen] = useState(false)
  const [eventFormOpen, setEventFormOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  const totalSteps = 3

  const orgForm = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    validators: {
      onChange: z.object({
        name: z.string().min(4),
        description: z.string().min(8),
      }),
    },
    async onSubmit(props) {
      try {
        // TODO: create organization
        if (session) {
          const response = await client.orgs.$post({
            json: {
              name: props.value.name,
              description: props.value.description,
              ownerId: session.session.userId,
            },
          })
          if (response.ok) {
            const result = await response.json()
            console.log('Org creation result', result)
            setOrgFormOpen(false)
            toast.success('Organization created successfully', {
              description:
                'You can now start creating events, after you log back in',
            })
            await authClient.signOut()
            router.navigate({
              to: '/login',
              replace: true,
              resetScroll: true,
              ignoreBlocker: true,
              reloadDocument: true,
            })
          }
        } else {
          toast.error('User must be logged in to create organization')
          setOrgFormOpen(false)
          router.invalidate()
        }
      } catch (error: any) {
        toast.error('Failed to create organization, try again')
        setOrgFormOpen(false)
      }
    },
  })

  const form = useForm({
    defaultValues: {
      title: '',
      category: '',
      description: '',
      dateTime: new Date(),
      venueName: '',
      venueFullAddress: '',
      city: '',
      country: '',
      coverImage: new File([], ''),
      tickets: [
        {
          name: '',
          price: 0,
          quantity: 0,
          saleStartDate: undefined,
          saleEndDate: undefined,
          isFree: true,
        },
      ],
    },
    validators: {
      onChange: z.object({
        title: z.string().min(6),
        category: z.string().min(6),
        description: z.string().min(13),
        dateTime: z.date().min(new Date()),
        venueName: z.string().min(6),
        venueFullAddress: z.string().min(12),
        city: z.string().min(3),
        country: z.string().min(3),
        coverImage: z.instanceof(File),
        tickets: z.array(
          z.object({
            name: z.string().min(4),
            price: z.number().min(0),
            quantity: z.number().min(1),
            saleStartDate: z.date().optional(),
            saleEndDate: z.date().optional(),
            isFree: z.boolean(),
          }),
        ),
      }),
    },
    onSubmit: async ({ value }) => {
      console.log(value, ':::Values to submit')
      if (session && session.org) {
        // Upload cover image first
        if (!value.coverImage.name) {
          return toast.warning('A cover image for the event is required')
        }
        const formData = new FormData()
        formData.append('file', value.coverImage)
        formData.append('type', 'event-cover')
        formData.append(
          'identifier',
          value.title.toLowerCase().split(' ').join('-'),
        )

        console.log('Uplaod URL', client.upload.$url())
        const response = await fetch(client.upload.$url().href, {
          body: formData,
          method: 'POST',
          credentials: 'include',
        })

        if (response.ok) {
          const result = await response.json()
          toast.success(result.message, {
            description: 'Now creating your new event',
          })

          // Create event
          const eventResponse = await client.event.$post({
            json: {
              description: value.description,
              title: value.title,
              orgId: session.org.id,
              category: value.category,
              country: value.country,
              city: value.city,
              venueName: value.venueName,
              address: value.venueFullAddress,
              coverUrl: result.link,
              coverUrlKey: result.key,
              dateTime: value.dateTime,
            },
          })

          if (eventResponse.ok) {
            const eventResult = await eventResponse.json()

            // Create Ticket
            const promiseSetlledTicketResponses = await Promise.allSettled(
              value.tickets.map((ticket) => {
                return client.tickets.$post({
                  json: {
                    name: ticket.name,
                    price: ticket.price,
                    quantity: ticket.quantity,
                    eventId: eventResult.id,
                    orgId: session.org.id,
                    saleStart: ticket.saleStartDate,
                    saleEnd: ticket.saleEndDate,
                    isFree: ticket.isFree,
                  },
                })
              }),
            )

            const promiseSettleTicketResults = await Promise.allSettled(
              promiseSetlledTicketResponses.map((settledResponse) => {
                if (
                  settledResponse.status === 'fulfilled' &&
                  settledResponse.value.ok
                ) {
                  return settledResponse.value.json()
                }
              }),
            )

            console.log(
              'Tickets creation log',
              promiseSettleTicketResults.values,
            )

            toast.success('Event and its tickets created successfully')
            console.log('New event', eventResult)
            queryClient.invalidateQueries({ queryKey: ['events'] })
          } else {
            toast.error('Failed to create event')
          }
        } else {
          toast.error('Failed to upload cover image', {
            description: 'You must attach a cover image to the event',
          })
          return
        }

        form.reset()
        setStep(0)
        setEventFormOpen(false)
        router.invalidate()
      } else {
        toast.error(
          'You must be logged in or create an organization to create an event',
        )
      }
    },
  })

  console.log('Form errors', form.state.errorMap, form.state.errors)

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }
  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    }
  }

  if (!session?.org) {
    return (
      <Dialog open={orgFormOpen} onOpenChange={(open) => setOrgFormOpen(open)}>
        <DialogTrigger asChild>{openTrigger}</DialogTrigger>
        <DialogContent className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create organization</DialogTitle>
            <DialogDescription>
              Create organization to enable event creation
            </DialogDescription>
          </DialogHeader>
          <div className="container">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Create organization
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="overflow-y-auto h-full">
                    <ScrollArea className="h-full w-full">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          orgForm.handleSubmit()
                        }}
                        className="space-y-4"
                      >
                        <orgForm.Field
                          name="name"
                          children={(field) => (
                            <>
                              <Label>Organization name</Label>
                              <Input
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                placeholder="Enter organization name"
                                autoComplete="off"
                              />
                            </>
                          )}
                        />

                        <orgForm.Field
                          name="description"
                          children={(field) => (
                            <>
                              <Label>Organization description</Label>

                              <Input
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                placeholder="Enter organization description"
                                autoComplete="off"
                              />
                            </>
                          )}
                        />

                        <div className="flex justify-start">
                          <orgForm.Subscribe
                            selector={(state) => [
                              state.canSubmit,
                              state.isSubmitting,
                            ]}
                            children={([canSubmit, isSubmitting]) => (
                              <Button
                                type="submit"
                                className="font-medium"
                                variant="outline"
                                size="sm"
                                onClick={handleBack}
                                disabled={!canSubmit}
                              >
                                {isSubmitting
                                  ? 'Creating organziation...'
                                  : 'Create Organization'}
                              </Button>
                            )}
                          />
                        </div>
                      </form>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={eventFormOpen}
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
          setStep(0)
        }
        setEventFormOpen(open)
      }}
    >
      <DialogTrigger asChild>{openTrigger}</DialogTrigger>
      <DialogContent className="px-2 md:px-3">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>Create events for your audience</DialogDescription>
        </DialogHeader>
        <div className="container">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full transition-all duration-300 ease-in-out',

                      index <= step ? 'bg-primary' : 'bg-primary/30',

                      index < step && 'bg-primary',
                    )}
                  />

                  {index < totalSteps - 1 && (
                    <div
                      className={cn(
                        'w-8 h-0.5',

                        index < step ? 'bg-primary' : 'bg-primary/30',
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  {step === 0
                    ? 'Basic Event info'
                    : step === 1
                      ? 'Location & Cover Image'
                      : 'Create Ticket type'}
                </CardTitle>
              </CardHeader>

              <CardContent className="h-full">
                <ScrollArea className="h-[40vh] w-full">
                  <form
                    onSubmit={(e) => {
                      console.log('Called from onSubmit')
                      e.preventDefault()
                      // form.handleSubmit()
                    }}
                    className="space-y-4"
                  >
                    <div className={cn('grid gap-4', { hidden: step !== 0 })}>
                      <form.Field
                        name="title"
                        children={(field) => (
                          <>
                            <Label>Event title</Label>
                            <Input
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Enter event title"
                              autoComplete="off"
                            />
                          </>
                        )}
                      />

                      <form.Field
                        name="category"
                        children={(field) => (
                          <>
                            <Label>Category</Label>

                            <Input
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Enter category"
                              autoComplete="off"
                            />
                          </>
                        )}
                      />

                      <form.Field
                        name="description"
                        children={(field) => (
                          <>
                            <Label>Event Description</Label>

                            <Input
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Describe the event"
                              autoComplete="off"
                            />
                          </>
                        )}
                      />

                      <form.Field
                        name="dateTime"
                        children={(field) => (
                          <>
                            <Label>Event Date and Time</Label>
                            <Input
                              onBlur={field.handleBlur}
                              // value={field.state.value.toDateString()}
                              onChange={(e) => {
                                console.log(
                                  'Date time value',
                                  e.target.valueAsDate,
                                  e.target.value,
                                )
                                field.handleChange(new Date(e.target.value))
                              }}
                              type="datetime-local"
                              placeholder="Pick a date and time"
                              autoComplete="off"
                            />
                          </>
                        )}
                      />
                    </div>

                    <div className={cn('grid gap-4', { hidden: step !== 1 })}>
                      <form.Field
                        name="venueName"
                        children={(field) => (
                          <>
                            <Label>Vernue Name</Label>
                            <Input
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Enter event venue"
                              autoComplete="off"
                            />
                          </>
                        )}
                      />

                      <form.Field
                        name="venueFullAddress"
                        children={(field) => (
                          <>
                            <Label>Vernue Full address or Link</Label>
                            <Input
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Enter event full address"
                              autoComplete="off"
                            />
                          </>
                        )}
                      />

                      <form.Field
                        name="city"
                        children={(field) => (
                          <>
                            <Label>Event City Location</Label>
                            <Input
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Enter event city location"
                              autoComplete="off"
                            />
                          </>
                        )}
                      />

                      <form.Field
                        name="country"
                        children={(field) => (
                          <>
                            <Label>Event country</Label>
                            <Input
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Enter event country"
                              autoComplete="off"
                            />
                          </>
                        )}
                      />

                      <form.Field
                        name="coverImage"
                        children={(field) => (
                          <>
                            <Label>Event cover image</Label>
                            <Input
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                const file = e.target.files && e.target.files[0]

                                if (!file) {
                                  return toast.warning('File is required')
                                }

                                if (file.size > 5 * 1024 * 1024) {
                                  return toast.warning('Max file size is 5MB')
                                }

                                if (
                                  file.type !== 'image/jpeg' &&
                                  file.type !== 'image/png'
                                ) {
                                  return toast.warning(
                                    'Only JPEG and PNG images are allowed',
                                  )
                                }

                                field.handleChange(file)
                              }}
                              type="file"
                              placeholder="Select cover image"
                              autoComplete="off"
                            />
                          </>
                        )}
                      />
                    </div>

                    <div className={cn('grid gap-4', { hidden: step !== 2 })}>
                      <form.Field name="tickets" mode="array">
                        {(field) => {
                          return (
                            <div>
                              {field.state.value.map((_, i) => {
                                return (
                                  <TicketItem
                                    key={i}
                                    form={form}
                                    i={i}
                                    field={field}
                                  />
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
                          )
                        }}
                      </form.Field>
                    </div>
                  </form>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-start gap-4">
            <Button
              className="font-medium"
              type="button"
              size="sm"
              variant="outline"
              disabled={step === 0}
              onClick={() => handleBack()}
              // disabled={step === 0}
            >
              Previous Step
            </Button>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  size="sm"
                  type="button"
                  className="font-medium"
                  disabled={step === 2 && !canSubmit}
                  onClick={() => {
                    if (step <= 1) {
                      handleNext()
                    } else {
                      form.handleSubmit()
                    }
                  }}
                >
                  {isSubmitting
                    ? 'Publishing...'
                    : step <= 1
                      ? 'Next Step'
                      : 'Publish Event'}
                </Button>
              )}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TicketItem({ form, i, field }: any) {
  const trackIsFree = useStore(
    form.store,
    (state) => state?.values.tickets[i].isFree,
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
          {(subField) => (
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
          {(subField) => (
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
          {(subField) => (
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
              {(subField) => (
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
              {(subField) => (
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
          {(subField) => (
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
