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

interface IProps {
  enabled: boolean
  on2FAEnabled: (totpUrl: string) => void
}

const Toggle2FAModal: FC<IProps> = ({ enabled, on2FAEnabled }) => {
  const modal = useModal()
  const [oldPassObscure, setOldPassObscure] = useState<boolean>(true)
  // const [faState, set2FAState] = useState<"start" | "verify">("start")

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      password: '',
    },
    validators: {
      onChange: z.object({
        password: z.string().min(8).max(100),
      }),
    },
    onSubmit: async ({ value }) => {
      console.log('Form values', value)

      if (enabled) {
        const { error: enable2FAError, data: enable2FAData } =
          await authClient.twoFactor.enable({
            password: value.password,
            issuer: 'Passry',
          })
        console.log('enabled data', enable2FAData)
        if (enable2FAError) {
          return toast.error('Failed to enable 2FA', {
            description: enable2FAError.message,
          })
        }

        on2FAEnabled(enable2FAData.totpURI)
      } else {
        // TODO: run disable flow
        const { error: disable2FAError } = await authClient.twoFactor.disable({
          password: value.password,
        })

        if (disable2FAError) {
          return toast.error('Failed to disable 2FA', {
            description: disable2FAError.message,
          })
        }
      }

      router.invalidate()
      modal.hide()
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
          <DialogTitle className="sr-only">2FA Toggle Dialog</DialogTitle>
          <DialogDescription className="text-start">
            {enabled
              ? 'Enter password to enable 2FA'
              : 'Enter password to disable 2FA'}
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
              name="password"
              children={(field) => (
                <FatInput
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  autoComplete={undefined}
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
          </div>
          <DialogFooter className="my-6">
            <Button variant="default" type="submit">
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NiceModal.create(Toggle2FAModal)
