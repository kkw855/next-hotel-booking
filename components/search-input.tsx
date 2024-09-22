import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

export const SearchInput = () => {
  return (
    <div className="relative hidden sm:block">
      <Search className="absolute left-4 top-2.5 h-4 w-4" />
      <Input
        placeholder="Search"
        className="bg-secondary-foreground/10 pl-10"
      />
    </div>
  )
}
