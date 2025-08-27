import { cn } from '@/lib/utils'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Calendar, Heart, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/date-formatter'
import { EventDetailsCard } from './-components/events/event-details'
import NiceModal from '@ebay/nice-modal-react'
import EventDateTimeModal from './-components/events/dialogs/event-datetime'
import EventLocationModal from './-components/events/dialogs/event-location'
import { useForm, useStore } from '@tanstack/react-form'
import z from 'zod'
import { useSession } from '@/hooks/session'
import { toast } from 'sonner'
import { client } from '@/lib/api-client'
import { useQueryClient } from '@tanstack/react-query'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import CategorySelect from './-components/events/dialogs/event-category'

export const Route = createFileRoute('/_authed/events/new')({
  loader: async () => {
    // fetch countries and cities
    const response = await fetch(
      `https://countriesnow.space/api/v0.1/countries/states`,
    )
    const { data: countries } = (await response.json()) as {
      error: boolean
      msg: string
      data: Array<{
        name: string
        iso3: string
        iso2: string
        states: Array<{
          name: string
          state_code: string
        }>
      }>
    }
    return countries
  },
  component: RouteComponent,
  errorComponent: () => <div>An error occured</div>,
  notFoundComponent: () => <div>Page not found</div>,
})

function RouteComponent() {
  const countries = Route.useLoaderData()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      title: '',
      category: 'party',
      description: '',
      dateTime: new Date(),
      venueName: undefined,
      venueFullAddress: '',
      city: '',
      country: '',
      coverImage: new File([], ''),
      capacity: Infinity,
      community: [
        {
          link: undefined,
          id: 'whatsapp',
        },
        {
          link: undefined,
          id: 'telegram',
        },
        {
          link: undefined,
          id: 'facebook',
        },
        {
          link: undefined,
          id: 'instagram',
        },
      ],
      tickets: [
        {
          name: 'Free',
          price: 0,
          quantity: Infinity,
          saleStartDate: undefined,
          saleEndDate: undefined,
          isFree: true,
        },
      ],
    },
    validators: {
      onChange: z.object({
        title: z.string().min(6),
        category: z.string(),
        description: z.string().min(13),
        dateTime: z.date().min(new Date()),
        venueName: z.string().optional(),
        venueFullAddress: z.string().min(12),
        city: z.string().min(3),
        country: z.string().min(3),
        coverImage: z.instanceof(File),
        capacity: z.number(),
        community: z
          .array(
            z.object({
              link: z.string().url().optional(),
              id: z.string(),
            }),
          )
          .optional(),
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
        if (
          typeof value.coverImage !== 'undefined' &&
          !(value.coverImage as any)?.name
        ) {
          return toast.warning('A cover image for the event is required')
        }

        const coverImage = value.coverImage as unknown as File
        const formData = new FormData()
        formData.append('file', coverImage)
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
              venueName:
                typeof value.venueName === 'undefined' ? '' : value.venueName,
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
                    quantity: isFinite(ticket.quantity) ? ticket.quantity : 0,
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

            const promiseSettledCommunityRespnses = await Promise.allSettled(
              value.community
                .filter(({ link }) => typeof link === 'string')
                .map((com) => {
                  return client.community.$post({
                    json: {
                      eventId: eventResult.id,
                      orgId: session.org.id,
                      socialNetworkLabel: com.id,
                      socialNetworkId: com.id,
                      url: com.link as unknown as string,
                    },
                  })
                }),
            )

            await Promise.allSettled(
              promiseSettledCommunityRespnses.map((settledResponse) => {
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

        form.clearFieldValues('community')
        form.clearFieldValues('tickets')
        form.reset()
        // setStep(0)
        // setEventFormOpen(false)
        router.navigate({ to: '/events' })
      } else {
        toast.error(
          'You must be logged in or create an organization to create an event',
        )
      }
    },
  })

  console.log(form.getAllErrors(), 'Errors')
  console.log(form.state.errorMap, form.state.errors, 'Error map')

  const titleTracked = useStore(form.store, (state) => state.values.title)
  const categoryTracked = useStore(form.store, (state) => state.values.category)
  const { dateTime: dateTimeTracked } = useStore(form.store, (state) => {
    return { dateTime: state.values.dateTime }
  })
  // const ticketsTracked = useStore(form.store, (state) => state.values.tickets)
  const countryTracked = useStore(form.store, (state) => state.values.country)
  const cityTracked = useStore(form.store, (state) => state.values.city)
  const venueFullAddressTracked = useStore(
    form.store,
    (state) => state.values.venueFullAddress,
  )

  const formattedDateTime = formatDate(dateTimeTracked, {
    format: 'EEEE, MMMM dd. hh:mm aa',
    smart: false,
    includeTime: true,
  })

  const showDateTimeModal = () => {
    NiceModal.show(EventDateTimeModal, {
      name: 'dateTime',
      form,
      defaultStateDate: dateTimeTracked,
    })
  }

  const showEventLocationModal = () => {
    NiceModal.show(EventLocationModal, {
      fieldNames: ['country', 'city', 'venueFullAddress'],
      form,
      countries,
      defaultAddress: '',
      defaultCity: '',
      defaultCountry: '',
    })
  }

  const [files, setFiles] = useState<Array<File> | undefined>([])
  const [filePreview, setFilePreview] = useState<string | undefined>()

  const handleDrop = (fileList: Array<File>) => {
    setFiles(fileList)

    if (fileList.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setFilePreview(e.target.result)
        }
      }

      reader.readAsDataURL(fileList[0])
    }
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div
          defaultValue="events"
          className="w-full flex-col justify-start gap-6 px-4 lg:px-6"
        >
          <div className="relative w-full">
            <div>
              <form.Field
                name="coverImage"
                children={(field) => (
                  <Dropzone
                    maxSize={1024 * 1024 * 10}
                    maxFiles={1}
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                    onDrop={(files) => {
                      handleDrop(files)
                      field.handleChange(files && files[0])
                    }}
                    className="w-full h-full z-50"
                    src={files}
                    onError={(error) => {
                      console.error('Error getting file', error)
                      toast.error('Error getting image', {
                        description: error.message,
                      })
                    }}
                  >
                    <DropzoneEmptyState />
                    <DropzoneContent>
                      {filePreview && (
                        <div className="h-[400px] w-[400px] aspect-square relative">
                          <h1>File should Preview</h1>
                          <img
                            src={filePreview}
                            alt="Preview"
                            className="object-cover absolute inset-0 h-full w-full"
                          />
                        </div>
                      )}
                    </DropzoneContent>
                  </Dropzone>
                )}
              />
              <div className="absolute inset-0 bg-black/20" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  // toggleFavorite(event.id)
                }}
              >
                <Heart
                  className={cn(`h-4 w-4`, {
                    'fill-red-500 text-red-500': false,
                    'text-white': true,
                  })}
                />
              </Button>
            </div>
          </div>

          {/* Event details */}
          <div className="grid w-full gap-4 md:max-w-2xl py-4 lg:py-6 mx-auto">
            <div className="flex items-center justify-between">
              <h1
                className="text-2xl lg:text-3xl font-extrabold"
                // onClick={showEventTitleModal}
              >
                <form.Field
                  name={'title'}
                  children={(field) => (
                    <>
                      <Input
                        onBlur={field.handleBlur}
                        defaultValue={titleTracked}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter title"
                        autoComplete="off"
                        className="text-2xl lg:text-3xl font-extrabold p-2 border-none bg-none"
                      />
                    </>
                  )}
                />
              </h1>
              <CategorySelect
                defaultValue={categoryTracked}
                form={form}
                name="category"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <span
                className="flex items-center gap-2"
                onClick={showDateTimeModal}
              >
                <div className="p-3 border border-primary/30 items-center justify-center rounded-xl">
                  <Calendar className="size-6" />{' '}
                </div>
                {formattedDateTime.split('.')[0]} <br />
                {formattedDateTime.split('.')[1]}
              </span>
              <span
                className="flex items-center gap-2"
                onClick={showEventLocationModal}
              >
                <div className="p-3 border border-primary/30 items-center justify-center rounded-xl">
                  <MapPin className="size-6" />{' '}
                </div>
                {countryTracked || 'Nigeria'}, {cityTracked || 'Abuja'}
                <br />
                {venueFullAddressTracked || 'Address of the event'}
              </span>
            </div>
            <div></div>
            <EventDetailsCard
              form={form}
              fieldNames={['description', 'tickets', 'community']}
              description={'Add description here'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
