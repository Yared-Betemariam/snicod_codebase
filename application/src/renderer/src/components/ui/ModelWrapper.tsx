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
      {!noTrigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        simple={simple || false}
        className={cn('bg-zinc-800/0 rounded border-0 border-zinc-600/25 py-4', className)}
      >
        <div onClick={handleOnAdd} className="flex flex-col gap-4">
          {headerLabel && (
            <DialogHeader className="flex flex-col -space-y-0">
              <DialogTitle className="text-xl">{headerLabel}</DialogTitle>
              <DialogDescription className="opacity-50">{headerDesc}</DialogDescription>
            </DialogHeader>
          )}
          <div className="flex flex-col">{children}</div>
        </div>
        {onClick && closeLabel && (
          <DialogFooter>
            <button
              className="bg-zinc-700/50 px-3 py-1.5 rounded hover:bg-zinc-700/40 nofocus cursor-pointer"
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
