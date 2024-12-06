'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@renderer/utils'
import * as React from 'react'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden border border-color bg-white dark:bg-zinc-900 px-1.5 py-1 rounded text-sm text-popover-foreground/70 shadow-sm m-2 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

const Hint = ({ children, hint }: { children: React.ReactNode; hint: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger className="h-full">{children}</TooltipTrigger>
      <TooltipContent side={'bottom'} sideOffset={-2}>
        {hint.split(',').map((text, index) => (
          <span
            key={index}
            className={cn('text-xs font-light', index == 1 && 'opacity-75 dark:opacity-50 ml-2')}
          >
            {text}
          </span>
        ))}
      </TooltipContent>
    </Tooltip>
  )
}
export { Hint, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
