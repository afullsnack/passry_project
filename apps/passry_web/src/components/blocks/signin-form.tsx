'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Apple, Chrome, Facebook } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

export function SignInForm() {
  const navigate = useNavigate()

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    // e.preventDefault()
    // setIsLoading(true)

    try {
      // Better Auth integration would go here
      // Example: await signIn.email({ email, password })
      console.log('Sign in with:', { email, password })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      // setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: string) => {
    try {
      // Better Auth social sign in would go here
      // Example: await signIn.social({ provider })
      console.log('Sign in with:', provider)
    } catch (error) {
      console.error('Social sign in error:', error)
    }
  }

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Values', value)
      handleSubmit(value)
    },
    validators: {
      onChange: z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    },
  })

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">Welcome back!</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <form.Field
            name="email"
            children={(field) => (
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                required
                className="h-12"
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <form.Field
            name="password"
            children={(field) => (
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                required
                className="h-12"
              />
            )}
          />
        </div>

        <div className="text-left">
          <button
            type="button"
            className="text-sm text-cyan-500 hover:text-cyan-600 font-medium"
          >
            Forgot password
          </button>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-600/30 text-white font-medium"
              disabled={!canSubmit}
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </Button>
          )}
        />
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          {"Don't have an account? - "}
        </span>
        <button
          onClick={() => navigate({ to: '/signup' })}
          className="text-cyan-500 hover:text-cyan-600 font-medium"
        >
          Sign Up
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">OR</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 justify-start gap-3 bg-transparent"
          onClick={() => handleSocialSignIn('apple')}
        >
          <Apple className="h-5 w-5" />
          Continue with Apple.
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 justify-start gap-3 bg-transparent"
          onClick={() => handleSocialSignIn('google')}
        >
          <Chrome className="h-5 w-5 text-red-500" />
          Continue with Google.
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 justify-start gap-3 bg-transparent"
          onClick={() => handleSocialSignIn('facebook')}
        >
          <Facebook className="h-5 w-5 text-blue-600" />
          Continue with Facebook.
        </Button>
      </div>
    </div>
  )
}
