import { cn } from '@renderer/utils'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const PopoverWrapper = ({
  children,
  trigger,
  className,
  open,
  onOpen
}: {
  children: React.ReactNode
  trigger: React.ReactNode
  className?: string
  open?: boolean
  onOpen?: (value: boolean) => void
}) => {
  return (
    <Popover open={open} onOpenChange={onOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        sideOffset={-34}
        side={'top'}
        align={'center'}
        className={cn(
          'bg-neutral-900 text-neutral-100 border border-neutral-700/25 rounded border-color',
          className
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
export default PopoverWrapper
