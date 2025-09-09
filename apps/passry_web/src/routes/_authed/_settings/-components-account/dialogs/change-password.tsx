import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import type { FC } from 'react'
import { FatInput } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeClosed, Lock } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { useRouter } from '@tanstack/react-router'

interface IProps {}

const ChangePassword: FC<IProps> = () => {
  const modal = useModal()
  const [oldPassObscure, setOldPassObscure] = useState<boolean>(true)
  const [newPassObscure, setNewPassObscure] = useState<boolean>(true)
  const [newAgainPassObscure, setNewAgainPassObscure] = useState<boolean>(true)

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validators: {
      onChange: z.object({
        oldPassword: z.string().min(8).max(100),
        newPassword: z.string().min(8).max(100),
        newPasswordAgain: z.string().min(8).max(100),
      }),
    },
    onSubmit: async ({ value }) => {
      console.log('Form values', value)

      const { error: changePasswordError } = await authClient.changePassword({
        currentPassword: value.oldPassword,
        newPassword: value.newPassword,
        revokeOtherSessions: true,
      })

      if (changePasswordError) {
        return toast.error('Password change failed', {
          description: changePasswordError.message,
        })
      }

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            modal.hide()
            router.navigate({
              to: '/login',
              replace: true,
              resetScroll: true,
              ignoreBlocker: true,
              reloadDocument: true,
            })
          },
        },
      })
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
          <DialogDescription className="text-start">
            Change your password
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()

            const errorMaps = form.state.errorMap.onChange

            if (errorMaps) {
              for (const [key, value] of Object.entries(errorMaps)) {
                toast.error(key, {
                  description: value[0].message,
                })
              }
            } else {
              form.handleSubmit()
            }
          }}
          className="w-full grid relative"
        >
          <div className="grid items-center gap-3">
            <form.Field
              name="oldPassword"
              children={(field) => (
                <FatInput
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  suffix={
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      onClick={() => setOldPassObscure((_prev) => !_prev)}
                    >
                      {oldPassObscure && <Eye className="size-5 mx-3" />}
                      {!oldPassObscure && <EyeClosed className="size-5 mx-3" />}
                    </Button>
                  }
                  preffix={<Lock className="size-5 ml-3" />}
                  type={!oldPassObscure ? 'text' : 'password'}
                  placeholder="Enter old password"
                />
              )}
            />
            <Separator className="my-6" />
            <form.Field
              name="newPassword"
              children={(field) => (
                <FatInput
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  suffix={
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => setNewPassObscure((_prev) => !_prev)}
                    >
                      {newPassObscure && <Eye className="size-5 mx-3" />}
                      {!newPassObscure && <EyeClosed className="size-5 mx-3" />}
                    </Button>
                  }
                  preffix={<Lock className="size-5 ml-3" />}
                  type={!newPassObscure ? 'text' : 'password'}
                  placeholder="Enter new password"
                />
              )}
            />
            <form.Field
              name="newPasswordAgain"
              children={(field) => (
                <FatInput
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  suffix={
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => setNewAgainPassObscure((_prev) => !_prev)}
                    >
                      {newAgainPassObscure && <Eye className="size-5 mx-3" />}
                      {!newAgainPassObscure && (
                        <EyeClosed className="size-5 mx-3" />
                      )}
                    </Button>
                  }
                  preffix={<Lock className="size-5 ml-3" />}
                  type={!newAgainPassObscure ? 'text' : 'password'}
                  placeholder="Enter new password again"
                />
              )}
            />
          </div>
          <DialogFooter className="my-6">
            <Button variant="default" type="submit">
              Confirm new password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NiceModal.create(ChangePassword)
