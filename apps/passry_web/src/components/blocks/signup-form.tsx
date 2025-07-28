'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Apple, Chrome, Facebook } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface SignUpFormProps {
  onSwitchToSignIn?: () => void
}

export function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match")
      }

      // Better Auth integration would go here
      // Example: await signUp.email({
      //   email: formData.email,
      //   password: formData.password,
      //   name: formData.name
      // })
      console.log('Sign up with:', formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Sign up error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignUp = async (provider: string) => {
    try {
      // Better Auth social sign up would go here
      // Example: await signUp.social({ provider })
      console.log('Sign up with:', provider)
    } catch (error) {
      console.error('Social sign up error:', error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">Create your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter info"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Phone</Label>
          <Input
            id="signup-phone"
            type="tel"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="Enter info"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Signing Up As*</Label>
          <AccountSelector />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium mt-12"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>
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

const AccountSelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-full py-1">
        <SelectValue placeholder="Select Account Type" className="w-full" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectItem value="attendee">Attendee</SelectItem>
        <SelectItem value="organiser">Organiser</SelectItem>
      </SelectContent>
    </Select>
  )
}
