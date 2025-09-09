import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import type { FC } from 'react'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useSession } from '@/hooks/session'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { toast } from 'sonner'
import { client } from '@/lib/api-client'

interface IProps {}

const ChangeOrgName: FC<IProps> = () => {
  const modal = useModal()

  const { data: session } = useSession()

  const form = useForm({
    defaultValues: {
      name: session?.org?.name,
    },
    validators: {
      onChange: z.object({
        name: z.string().min(4).max(100),
      }),
    },
    onSubmit: ({ value }) => {
      console.log('New org name', value)
      try {
        // if (session) {
        //   const response = await client.orgs.({
        //     json: {
        //       name: props.value.name,
        //       description: props.value.description,
        //       ownerId: session.session.userId,
        //     },
        //   })
        //   if (response.ok) {
        //     const result = await response.json()
        //     console.log('Org creation result', result)
        //     setOrgFormOpen(false)
        //     toast.success('Organization created successfully', {
        //       description:
        //         'You can now start creating events, after you log back in',
        //     })
        //     await authClient.signOut()
        //     router.navigate({
        //       to: '/login',
        //       replace: true,
        //       resetScroll: true,
        //       ignoreBlocker: true,
        //       reloadDocument: true,
        //     })
        //   }
        // } else {
        //   toast.error('User must be logged in to create organization')
        //   router.invalidate()
        // }
        modal.hide()
      } catch (error: any) {
        toast.error('Failed to change organisation name', {
          description:
            error instanceof Error ? error.message : 'Please try again later.',
        })
      }
    },
  })

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => (open ? modal.show() : modal.hide())}
      modal
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Change password dialog</DialogTitle>
          <DialogDescription className="text-start">
            Change your organisation name
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="w-full grid relative"
        >
          <div className="grid items-center gap-3">
            <form.Field
              name="name"
              children={(field) => (
                <Input
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  placeholder="Enter a new name"
                  defaultValue={session?.org?.name}
                />
              )}
            />
          </div>
          <DialogFooter className="my-6">
            <Button variant="default">Confirm new name</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NiceModal.create(ChangeOrgName)
