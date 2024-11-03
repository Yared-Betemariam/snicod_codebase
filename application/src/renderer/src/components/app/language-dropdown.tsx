'use client'

import { Check, ChevronDown } from 'lucide-react'
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
import { cn } from '@renderer/utils'

const frameworks = [
  {
    value: 'text',
    label: 'Text'
  },
  {
    value: 'javascript',
    label: 'JavaScript'
  },
  {
    value: 'typescript',
    label: 'TypeScript'
  },
  {
    value: 'python',
    label: 'Python'
  },
  {
    value: 'java',
    label: 'Java'
  },
  {
    value: 'cpp',
    label: 'C++'
  },
  {
    value: 'cs',
    label: 'C#'
  },
  {
    value: 'go',
    label: 'Go'
  },
  {
    value: 'php',
    label: 'PHP'
  },
  {
    value: 'ruby',
    label: 'Ruby'
  },
  {
    value: 'swift',
    label: 'Swift'
  },
  {
    value: 'kotlin',
    label: 'Kotlin'
  },
  {
    value: 'rust',
    label: 'Rust'
  },
  {
    value: 'r',
    label: 'R'
  },
  {
    value: 'perl',
    label: 'Perl'
  },
  {
    value: 'dart',
    label: 'Dart'
  },
  {
    value: 'bash',
    label: 'Bash'
  },
  {
    value: 'markdown',
    label: 'Markdown'
  },
  {
    value: 'lua',
    label: 'Lua'
  },
  {
    value: 'shell',
    label: 'Shell'
  },
  {
    value: 'html',
    label: 'HTML'
  },
  {
    value: 'css',
    label: 'CSS'
  },
  {
    value: 'sql',
    label: 'SQL'
  },
  {
    value: 'json',
    label: 'JSON'
  },
  {
    value: 'xml',
    label: 'XML'
  },
  {
    value: 'yaml',
    label: 'YAML'
  }
]

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
            value && 'hover:bg-zinc-950/25'
          )}
        >
          {value ? frameworks.find((framework) => framework.value === value)?.label : 'Language'}
          <ChevronDown className="ml-2.5 h-4 w-4 shrink-0 opacity-50" />
        </span>
      </PopoverTrigger>
      {value && (
        <PopoverContent align={'end'} className="w-[230px] rounded p-0 border-color bg-zinc-900">
          <Command>
            <CommandInput placeholder="Search language" />
            <CommandList className="py-2">
              <CommandEmpty className="p-2 px-5 text-zinc-600 text-sm">
                No Language found.
              </CommandEmpty>
              <CommandGroup className="p-0 max-h-[13rem] overflow-y-auto">
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                    className="hover:bg-primary h-[26px] hover:text-zinc-100 rounded-none px-4"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
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
