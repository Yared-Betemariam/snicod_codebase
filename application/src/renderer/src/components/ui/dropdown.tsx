'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@renderer/utils'
import { IconType } from 'react-icons'
import { IoIosCheckmark } from 'react-icons/io'

export type DropDownItem = {
  Icon?: IconType
  value: string
  label: string
}

type Props = {
  value: string
  setValue: (value: string) => void
  items: DropDownItem[]
  width?: number
  className?: string
}

export function Dropdown({ width, value, items, setValue, className }: Props) {
  const [open, setOpen] = React.useState(false)

  const getIcon = (value) => {
    const Icon = items.find((item) => item.value === value)?.Icon
    if (!Icon) return undefined
    return <Icon className="size-4 mr-2 ml-1" />
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-fit">
        <div
          role="combobox"
          style={{
            width
          }}
          aria-expanded={open}
          className={cn(
            'bg-neutral-200/75 dark:bg-neutral-900/50 px-2 shadow-neutral-950/25 text-neutral-800 dark:text-neutral-200 h-8 font-medium hover:bg-neutral-200/80 dark:hover:bg-neutral-900/60 flex items-center text-sm rounded transition-all duration-200',
            className
          )}
        >
          {value && getIcon(value)}
          <span>{value ? items.find((item) => item.value === value)?.label : 'Select'}</span>
          <ChevronDown className="ml-auto size-4 shrink-0 opacity-75  " />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        style={{
          width
        }}
        className="p-0 rounded border-color bg-neutral-900 text-neutral-100"
      >
        <Command>
          <CommandGroup className="p-0 py-1.5">
            <CommandList>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                  className="px-1 h-8 hover:bg-primary rounded-none"
                >
                  <IoIosCheckmark
                    className={cn(
                      'mr-2 ml-1 size-6',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.Icon && <item.Icon className="size-4 mr-3 inline" />}
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
