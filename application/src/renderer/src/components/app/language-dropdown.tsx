'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn, languages } from '@renderer/utils'
import { IoIosCheckmark } from 'react-icons/io'

export function LanguageDropdown({
  value,
  setValue
}: {
  value?: string
  setValue: (newValue: string) => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={cn(!value && 'opacity-50 cursor-auto')}>
        <span
          role="button"
          aria-expanded={open}
          className={cn(
            'w-fit px-3 text-sm flex items-center justify-between',
            value && 'hover:bg-neutral-400/20 dark:hover:bg-neutral-950/25'
          )}
        >
          {value ? languages.find((framework) => framework.value === value)?.label : 'Language'}
          <ChevronDown className="ml-2.5 h-4 w-4 shrink-0 opacity-50" />
        </span>
      </PopoverTrigger>
      {value && (
        <PopoverContent
          align={'end'}
          className="w-[230px] rounded p-0 border-color bg-neutral-900 text-neutral-100"
        >
          <Command>
            <CommandInput placeholder="Search language" className="border-transparent" />
            <CommandList className="py-2">
              <CommandEmpty className="px-4 h-[26px] flex items-center text-neutral-600 text-sm">
                No Language found.
              </CommandEmpty>
              <CommandGroup className="p-0 max-h-[13rem] overflow-y-auto">
                {languages.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                    className="hover:bg-primary h-[26px] hover:text-neutral-100 rounded-none px-4"
                  >
                    <IoIosCheckmark
                      className={cn(
                        'mr-2 size-6',
                        value === framework.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  )
}
