'use client'

// import { signOut, useSession } from 'next-auth/react'

// import { Button } from '@/components/ui/button'

const Dashboard = () => {
  // const session = useSession()
  //
  // if (!session.data?.user) return 'Not Auth'
  //
  // const user = session.data.user
  //
  // console.log('session', session)

  return (
    <div>
      <h1>Dashboard Page</h1>
      {/*<Button onClick={() => void signOut({ redirectTo: '/' })}>*/}
      {/*  Sign out*/}
      {/*</Button>*/}
    </div>
  )
}

export default Dashboard
