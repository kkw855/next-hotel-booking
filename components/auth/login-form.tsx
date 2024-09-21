'use client'

import { signIn } from 'next-auth/react'
import { Effect } from 'effect'
import { FcGoogle } from 'react-icons/fc'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { DEFAULT_LOGIN_REDIRECT } from '@/middleware'

export const LoginForm = () => {
  const onClick = Effect.promise(() =>
    signIn('google', {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    }),
  )

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <h1 className="text-xl font-bold">Sign in</h1>
        <p className="text-gray-400">to continue to stay-savvy</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          variant="outline"
          size="lg"
          className="flex w-full justify-start gap-4"
          onClick={() => void Effect.runPromise(onClick)}
        >
          <FcGoogle className="h-6 w-6" />
          Continue with Google
        </Button>
        <div className="flex items-center text-center">
          <Separator className="w-5/12" />
          <p className="w-full">or</p>
          <Separator className="w-5/12" />
        </div>
      </CardContent>
      <CardFooter>
        No account?
        <Button className="px-2 text-gray-500" variant="link">
          Sign up
        </Button>
      </CardFooter>
    </Card>
  )
}
