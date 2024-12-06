'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { cn } from '@renderer/utils'
import { MouseEventHandler } from 'react'

interface ModalWrapperProps {
  children?: React.ReactNode
  className?: string
  noHeader?: boolean
  headerLabel?: string
  simple?: boolean
  headerDesc?: string
  trigger: React.ReactNode
  closeLabel?: string
  onClick?: () => void
  noTrigger?: boolean
  open?: boolean
  onOpen?: (value: boolean) => void
}

export function ModalWrapper({
  children,
  noTrigger,
  noHeader,
  headerDesc,
  simple,
  open,
  onOpen,
  headerLabel,
  trigger,
  className,
  closeLabel,
  onClick
}: ModalWrapperProps) {
  const handleOnAdd: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation()
  }
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      {!noTrigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent
        simple={simple || false}
        className={cn(
          'bg-neutral-50 p-0 dark:bg-neutral-800 rounded border border-neutral-400/25  dark:border-neutral-600/25 shadow-xl dark:text-zinc-100 text-zinc-900"',
          className
        )}
      >
        <div onClick={handleOnAdd} className="flex w-full h-full flex-col gap-3">
          {headerLabel && (
            <DialogHeader className={cn('flex  flex-col -space-y-0', noHeader && 'hidden')}>
              <DialogTitle className="text-lg px-3 py-2.5">{headerLabel}</DialogTitle>
              <span className="w-full border-b border-neutral-400/25 dark:border-neutral-600/25" />
              <DialogDescription className="px-3 pt-2 dark:font-light">
                {headerDesc}
              </DialogDescription>
            </DialogHeader>
          )}
          <div className={cn('flex flex-col h-full w-full', simple && 'p-3 pt-0')}>{children}</div>
        </div>
        {onClick && closeLabel && (
          <DialogFooter>
            <button
              className="bg-neutral-700/50 px-3 py-1.5 rounded hover:bg-neutral-700/40 nofocus cursor-pointer"
              type="submit"
              onClick={onClick}
            >
              {closeLabel}
            </button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
