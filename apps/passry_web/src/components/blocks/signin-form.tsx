'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Apple, Chrome, Facebook } from 'lucide-react'

interface SignInFormProps {
  onSwitchToSignUp: () => void
}

export function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Better Auth integration would go here
      // Example: await signIn.email({ email, password })
      console.log('Sign in with:', { email, password })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
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

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">Welcome back!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter info"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter info"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-cyan-500 hover:text-cyan-600 font-medium"
          >
            Forgot password
          </button>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          {"Don't have an account? - "}
        </span>
        <button
          onClick={onSwitchToSignUp}
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
