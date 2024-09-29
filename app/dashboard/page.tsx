import { auth, redirectLoginPage } from '@/features/auth/auth'

export async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirectLoginPage('dashboard')
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {/*<Button onClick={() => void signOut({ redirectTo: '/' })}>*/}
      {/*  Sign out*/}
      {/*</Button>*/}
    </div>
  )
}

export default Dashboard
