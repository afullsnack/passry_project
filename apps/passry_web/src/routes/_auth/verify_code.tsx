import { Container, Main, Section } from '@/components/craft'
import { Link, createFileRoute, useSearch } from '@tanstack/react-router'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import logoMark from '@/assets/PASSRY_Logo_TextMark.svg'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import VerifyOTPDialog from './-verify-code-dialog'
import { useState } from 'react'

export const Route = createFileRoute('/_auth/verify_code')({
  component: VerifyCode,
  validateSearch: z.object({
    email: z.string().email(),
  }),
})

function VerifyCode() {
  const [modalOpen, setModalOpen] = useState(false)
  const [username, setUsername] = useState('')
  const { email } = useSearch({ from: '/_auth/verify_code' })
  const form = useForm({
    defaultValues: {
      otpCode: '',
    },
    validators: {
      onChange: z.object({
        otpCode: z.string().min(6).max(6),
      }),
    },
    onSubmit: async ({ value }) => {
      console.log('OTP Value', value.otpCode)
      const { data, error } = await authClient.emailOtp.verifyEmail({
        email,
        otp: value.otpCode,
      })

      if (error) {
        console.error('Error verifying OTP code', error)
        return
      }

      console.log('Data', data)

      if (data.status) {
        setUsername(data.user.name)
        setModalOpen(true)
      }
    },
  })
  return (
    <Main>
      <Section className="!w-full !mx-0 !p-0 min-h-screen flex">
        <Container className="hidden lg:flex lg:w-1/2 relative">
          <div
            className="w-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 relative overflow-hidden"
            style={{
              backgroundImage: "url('/images/hero-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 dark:bg-slate-900/60 z-[1]" />

            {/* Logo */}
            <div className="z-20 absolute top-8 left-8">
              <Link to="/">
                <div className="text-2xl font-bold text-cyan-400">
                  <img src={logoMark} className="object-cover w-24" />
                </div>
              </Link>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-12 text-center">
              <h1 className="text-4xl font-bold text-white mb-6">
                Find Events That Inspire you
              </h1>
              <p className="text-lg text-gray-300 max-w-md leading-relaxed">
                From music shows to conferences, explore events happening around
                you, and never miss a moment.
              </p>

              {/* Pagination dots */}
              <div className="flex space-x-2 mt-12">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
            </div>
          </div>
        </Container>
        <Container className="w-full lg:w-1/2 flex">
          <div className="w-full max-w-md mx-auto flex flex-col justify-center px-6 py-12">
            {/* Mobile logo */}
            <div className="lg:hidden grid justify-center mb-8">
              <img src={logoMark} className="object-cover w-32" />
            </div>

            <div className="space-y-2 text-center mb-6">
              <h1 className="text-2xl font-semibold tracking-tight">
                Verify Email
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the 6 digit code sent to your email
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <form.Field
                name="otpCode"
                children={(field) => (
                  <InputOTP
                    maxLength={6}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    containerClassName="justify-center mb-4"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Resend Code in: </span>
                <button
                  onClick={async () => {
                    const { data, error } =
                      await authClient.emailOtp.sendVerificationOtp({
                        email,
                        type: 'email-verification',
                      })
                    if (error) {
                      console.error('OTP resend error', error)
                      return
                    }
                    if (data.success) {
                      window.alert('OTP resent')
                    }
                  }}
                  className="text-cyan-500 hover:text-cyan-600 font-medium"
                >
                  Resend OTP Code
                </button>
              </div>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="w-full h-12 bg-cyan-500 disabled:bg-cyan-600/30 hover:bg-cyan-600 text-white font-medium mt-12"
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? 'Verifying...' : 'Verify Code'}
                  </Button>
                )}
              />
            </form>
          </div>
        </Container>
      </Section>
      <VerifyOTPDialog open={modalOpen} name={username} />
    </Main>
  )
}
