'use client'

import { signOut, useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Dashboard = () => {
  const session = useSession()

  if (!session.data?.user) return 'Not Auth'

  const user = session.data.user

  console.log('session', session)

  return (
    <div>
      <h1>Dashboard Page</h1>
      <Avatar>
        <AvatarImage
          src={user.image ?? undefined}
          alt={user.name ?? undefined}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button onClick={() => void signOut()}>Sign out</Button>
    </div>
  )
}

export default Dashboard
