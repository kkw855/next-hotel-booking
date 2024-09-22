import Link from 'next/link'
import { FaBed } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SearchInput } from '@/components/search-input'

import { auth } from '@/auth'
import { match } from 'ts-pattern'
import { ThemeToggle } from '@/components/theme-toggle'

export const Navbar = async () => {
  const session = await auth()

  return (
    <nav className="sticky top-0 border border-b-primary/10 bg-secondary">
      {/* w-full */}
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4 p-4 xl:px-20">
        <Link href="/" className="flex items-center gap-1">
          <FaBed className="h-8 w-8 text-blue-500" />
          <div className="font-bold">StaySavvy</div>
        </Link>

        <SearchInput />

        <div className="flex items-center gap-8">
          <ThemeToggle />
          {match(session?.user)
            .with(undefined, () => (
              <>
                <Button variant="outline">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </>
            ))
            .otherwise((user) => (
              <Avatar>
                <AvatarImage
                  // TODO: null 제거 방법
                  src={user.image ?? undefined}
                  alt={user.name ?? undefined}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ))}
        </div>
      </div>
    </nav>
  )
}
