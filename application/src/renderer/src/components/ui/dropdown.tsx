'use client'

import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'

import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@renderer/utils'

export type DropDownItem = {
  value: string
  label: string
}

type Props = {
  value: string
  setValue: (value: string) => void
  items: DropDownItem[]
}

export function Dropdown({ value, items, setValue }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div
          role="combobox"
          aria-expanded={open}
          className="bg-zinc-800 w-[110px] px-2 shadow-lg shadow-zinc-950/25 text-zinc-200 h-10 font-semibold hover:bg-zinc-800/80 border border-color flex items-center text-sm"
        >
          <span>{value ? items.find((item) => item.value === value)?.label : 'Filter'}</span>
          <ChevronDown className="ml-auto size-5 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-[110px] p-0 rounded-none border-color bg-zinc-800"
      >
        <Command>
          <CommandGroup>
            <CommandList>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                  className="px-1"
                >
                  <Check
                    className={cn(
                      'mr-1.5 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
