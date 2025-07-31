import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useForm } from '@tanstack/react-form'
import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

interface IProps {
  openTrigger: React.ReactNode
}

export default function CreateEventDialog({ openTrigger }: IProps) {
  const [step, setStep] = useState(0)

  const totalSteps = 3

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
          quantity: 1,
          saleStateDate: new Date(),
          saleEndDate: new Date(),
          isFree: true,
        },
      ],
    },
    validators: {
      onChange: z.object({
        title: z.string(),
        category: z.string(),
        description: z.string(),
        dateTime: z.date(),
        venueName: z.string(),
        venueFullAddress: z.string(),
        city: z.string(),
        country: z.string(),
        coverImage: z.instanceof(File),
        tickets: z.array(
          z.object({
            name: z.string(),
            price: z.number().min(0),
            quantity: z.number().min(1),
            saleStateDate: z.date(),
            saleEndDate: z.date(),
            isFree: z.boolean(),
          }),
        ),
      }),
    },
    onSubmit: ({ value }) => {
      onSubmit(value)
    },
  })

  const onSubmit = async (formData: unknown) => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      console.log(formData)

      setStep(0)

      form.reset()

      toast.success('Form successfully submitted')
    }
  }

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

  return (
    <Dialog>
      <DialogTrigger asChild>{openTrigger}</DialogTrigger>
      <DialogContent className="overflow-y-auto">
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

              <CardContent className="overflow-y-auto h-full">
                <ScrollArea className="h-full w-full">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      form.handleSubmit()
                    }}
                  >
                    {step === 0 && (
                      <>
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
                                onChange={(e) =>
                                  field.handleChange(e.target.valueAsDate!)
                                }
                                type="datetime-local"
                                placeholder="Pick a date and time"
                                autoComplete="off"
                              />
                            </>
                          )}
                        />

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            className="font-medium"
                            variant="outline"
                            size="sm"
                            onClick={handleBack}
                            disabled={step === 0}
                          >
                            Previous Step
                          </Button>

                          <Button
                            type="submit"
                            size="sm"
                            className="font-medium"
                            onClick={handleNext}
                          >
                            {step === 2 ? 'Submit' : 'Next Step'}
                          </Button>
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
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
                                onChange={(e) =>
                                  field.handleChange(e.target.files![0])
                                }
                                type="file"
                                placeholder="Enter event venue"
                                autoComplete="off"
                              />
                            </>
                          )}
                        />

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            className="font-medium"
                            size="sm"
                            variant="outline"
                            onClick={handleBack}
                            disabled={step === 0}
                          >
                            Previous Step
                          </Button>

                          <Button
                            type="submit"
                            size="sm"
                            className="font-medium"
                            onClick={handleNext}
                          >
                            {step === 2 ? 'Submit' : 'Next Step'}
                          </Button>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <ScrollArea className="w-full h-[300px]">
                        <form.Field name="tickets" mode="array">
                          {(field) => (
                            <div>
                              {field.state.value.map((_, i) => {
                                return (
                                  <div className="border border-gray-700 rounded-md p-4 my-4 border-dashed">
                                    <div className="w-full flex items-center justify-end mx-3">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => field.removeValue(i)}
                                      >
                                        <X className="size-4" />
                                      </Button>
                                    </div>
                                    <form.Field
                                      key={i}
                                      name={`tickets[${i}].name`}
                                    >
                                      {(subField) => (
                                        <div>
                                          <Label>Ticket name</Label>
                                          <Input
                                            value={subField.state.value}
                                            onBlur={subField.handleBlur}
                                            onChange={(e) =>
                                              subField.handleChange(
                                                e.target.value,
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                    </form.Field>
                                    <form.Field
                                      key={i}
                                      name={`tickets[${i}].price`}
                                    >
                                      {(subField) => (
                                        <div>
                                          <Label>Price</Label>
                                          <Input
                                            value={subField.state.value}
                                            onBlur={subField.handleBlur}
                                            onChange={(e) =>
                                              subField.handleChange(
                                                e.target.valueAsNumber,
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                    </form.Field>
                                    <form.Field
                                      key={i}
                                      name={`tickets[${i}].quantity`}
                                    >
                                      {(subField) => (
                                        <div>
                                          <Label>Quantity</Label>
                                          <Input
                                            onBlur={subField.handleBlur}
                                            onChange={(e) =>
                                              subField.handleChange(
                                                e.target.valueAsNumber,
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                    </form.Field>
                                    <form.Field
                                      key={i}
                                      name={`tickets[${i}].saleStateDate`}
                                    >
                                      {(subField) => (
                                        <div>
                                          <Label>Sale End</Label>
                                          <Input
                                            onBlur={subField.handleBlur}
                                            type="datetime-local"
                                            onChange={(e) =>
                                              subField.handleChange(
                                                e.target.valueAsDate!,
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                    </form.Field>
                                    <form.Field
                                      key={i}
                                      name={`tickets[${i}].saleEndDate`}
                                    >
                                      {(subField) => (
                                        <div>
                                          <Label>Sale End</Label>
                                          <Input
                                            onBlur={subField.handleBlur}
                                            type="datetime-local"
                                            onChange={(e) =>
                                              subField.handleChange(
                                                e.target.valueAsDate!,
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                    </form.Field>
                                    <form.Field
                                      key={i}
                                      name={`tickets[${i}].isFree`}
                                    >
                                      {(subField) => (
                                        <div className="flex items-center justify-between">
                                          <Label>Switch to free event</Label>
                                          <Switch
                                            checked={subField.state.value}
                                            onCheckedChange={(checked) =>
                                              subField.handleChange(checked)
                                            }
                                          />
                                        </div>
                                      )}
                                    </form.Field>
                                  </div>
                                )
                              })}
                              <Button
                                onClick={() =>
                                  field.pushValue({
                                    name: '',
                                    price: 0,
                                    quantity: 0,
                                    saleEndDate: new Date(),
                                    saleStateDate: new Date(),
                                    isFree: true,
                                  })
                                }
                                variant="outline"
                                size="sm"
                                className="my-6"
                              >
                                Add New Ticket
                              </Button>
                            </div>
                          )}
                        </form.Field>

                        <div className="flex justify-start gap-4">
                          <Button
                            type="button"
                            className="font-medium"
                            size="sm"
                            variant="outline"
                            onClick={handleBack}
                            disabled={step === 0}
                          >
                            Previous Step
                          </Button>

                          <Button
                            type="submit"
                            size="sm"
                            className="font-medium"
                          >
                            {step === 2 ? 'Publish Event' : 'Next Step'}
                          </Button>
                        </div>
                      </ScrollArea>
                    )}
                  </form>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
