import {
  Link,
  Outlet,
  createFileRoute,
  useMatchRoute,
  useRouter,
} from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { Plus } from 'lucide-react'
import { useSession } from '@/hooks/session'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { client } from '@/lib/api-client'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/_authed/events')({
  component: RouteComponent,
})

function RouteComponent() {
  const isMobile = useIsMobile()
  const { data: session } = useSession()
  const [orgFormOpen, setOrgFormOpen] = useState(false)

  const queryClient = useQueryClient()

  const matchRoute = useMatchRoute()
  const router = useRouter()

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

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div
          defaultValue="events"
          className="w-full flex-col justify-start gap-6"
        >
          <div className="flex items-center justify-between px-4 lg:px-6 mb-6 lg:mb-4">
            <div className="flex items-center gap-2">
              {matchRoute({ to: '/events' }) && <Input placeholder="Search" />}
            </div>

            {!matchRoute({ to: '/events/new' }) && (
              <Button
                className=""
                size={isMobile ? 'sm' : 'default'}
                onClick={() => {
                  if (!session?.org) {
                    setOrgFormOpen(true)
                  } else {
                    router.navigate({ to: '/events/new' })
                  }
                }}
              >
                Create event <Plus className="ml-2 size-4" />
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-4 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <Dialog open={orgFormOpen} onOpenChange={(open) => setOrgFormOpen(open)}>
        {/*<DialogTrigger asChild>{openTrigger}</DialogTrigger>*/}
        <DialogContent className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create organization</DialogTitle>
            <DialogDescription>
              Create organization to enable event creation
            </DialogDescription>
          </DialogHeader>
          <div className="w-full container">
            <div className="space-y-4">
              <div className="flex">
                <Card className="shadow-sm w-full">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Create organization
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="overflow-y-auto h-full">
                    <ScrollArea className="h-full">
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
    </div>
  )
}
