'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Apple, Chrome, Facebook } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { authClient } from '@/lib/auth-client'

export function SignUpForm() {
  const navigate = useNavigate()

  const handleSocialSignUp = async (provider: string) => {
    try {
      // Better Auth social sign up would go here
      // Example: await signUp.social({ provider })
      console.log('Sign up with:', provider)
    } catch (error) {
      console.error('Social sign up error:', error)
    }
  }

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      accountType: '',
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
        accountType: z.enum(['attendee', 'organizer']),
      }),
    },
    onSubmit: async ({ value }) => {
      console.log('Values', value)
      const { data, error } = await authClient.signUp.email({
        email: value.email,
        password: value.password,
        phoneNumber: value.phone,
        name: value.name,
      })

      if (error) {
        console.error('Erorr signing up', error)
        return
      }

      console.log('data', data)
      navigate({ to: '/verify_code' })
    },
  })

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">Create your account</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <form.Field
            name="name"
            children={(field) => (
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
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
          <Label htmlFor="signup-email">Email</Label>
          <form.Field
            name="email"
            children={(field) => (
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
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
          <Label htmlFor="signup-email">Phone</Label>
          <form.Field
            name="phone"
            children={(field) => (
              <Input
                id="phone"
                type="text"
                placeholder="Enter your phone"
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
          <Label htmlFor="signup-password">Password</Label>
          <form.Field
            name="password"
            children={(field) => (
              <Input
                id="password"
                type="text"
                placeholder="Enter your password"
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
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <form.Field
            name="confirmPassword"
            children={(field) => (
              <Input
                id="confirmPassword"
                type="text"
                placeholder="Confirm your password"
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
          <Label htmlFor="confirm-password">Signing Up As*</Label>
          <form.Field
            name="accountType"
            children={(field) => (
              <>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  onOpenChange={field.handleBlur}
                >
                  <SelectTrigger className="w-full py-1">
                    <SelectValue
                      placeholder="Select Account Type"
                      className="w-full"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attendee">Attendee</SelectItem>
                    <SelectItem value="organizer">Organizer</SelectItem>
                  </SelectContent>
                </Select>
                {!!field.state.meta.errors.length && (
                  <span>{field.state.meta.errors.join(',')}</span>
                )}
              </>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="w-full h-12 bg-cyan-500 disabled:bg-cyan-600/30 hover:bg-cyan-600 text-white font-medium mt-12"
              disabled={!canSubmit}
            >
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </Button>
          )}
        />
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          Already have an account? -{' '}
        </span>
        <button
          onClick={() => navigate({ to: '/login' })}
          className="text-cyan-500 hover:text-cyan-600 font-medium"
        >
          Sign In
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
          onClick={() => handleSocialSignUp('apple')}
        >
          <Apple className="h-5 w-5" />
          Continue with Apple.
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 justify-start gap-3 bg-transparent"
          onClick={() => handleSocialSignUp('google')}
        >
          <Chrome className="h-5 w-5 text-red-500" />
          Continue with Google.
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 justify-start gap-3 bg-transparent"
          onClick={() => handleSocialSignUp('facebook')}
        >
          <Facebook className="h-5 w-5 text-blue-600" />
          Continue with Facebook.
        </Button>
      </div>
    </div>
  )
}
