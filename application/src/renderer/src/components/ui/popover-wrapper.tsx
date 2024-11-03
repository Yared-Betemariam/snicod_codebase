import { cn } from '@renderer/utils'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const PopoverWrapper = ({
  children,
  trigger,
  className
}: {
  children: React.ReactNode
  trigger: React.ReactNode
  className?: string
}) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        sideOffset={-34}
        side={'top'}
        align={'start'}
        className={cn('bg-zinc-900 border border-zinc-700/25 rounded', className)}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
export default PopoverWrapper
