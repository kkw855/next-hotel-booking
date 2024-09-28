import Link from 'next/link'
import { BookOpenCheck, Building, ChevronsUpDown, Plus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export const NavMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="gap-2">
          <Link href="/hotel/new">
            <Plus /> Add Hotel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="gap-2">
          <Link href="/hotel/new">
            <Building /> My Hotels
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="gap-2">
          <Link href="/hotel/new">
            <BookOpenCheck /> My Bookings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
