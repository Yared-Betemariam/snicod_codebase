import { cn } from '@renderer/utils'
import { ListFilter, X } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  isFilterBar?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

const Input = ({ className, isFilterBar, value, onChange, onClear, ...props }: Props) => {
  return (
    <>
      {isFilterBar ? (
        <div className={cn('relative h-fit w-full flex', className)}>
          <input
            className={cn(
              'pl-8 pr-4 h-fit w-full text-sm py-1 bg-zinc-800 placeholder:text-zinc-400/50 outline-none border border-color rounded-md focus-visible:ring-primary focus-visible:ring-1',
              className
            )}
            value={value}
            onChange={onChange}
            {...props}
          />
          <ListFilter className="size-4 text-zinc-500 absolute top-1/2 -translate-y-1/2 left-2" />
          {value && (
            <X
              className="size-6 text-zinc-500 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer hover:text-zinc-300 p-1 hover:bg-zinc-700/50 aspect-square rounded-full z-[50]"
              onClick={onClear}
            />
          )}
        </div>
      ) : (
        <div className={cn('relative flex h-fit w-full', className)}>
          <input
            className={cn(
              'px-3 w-full text-sm py-1 bg-transparent rounded-md placeholder:text-zinc-400/50 outline-none border border-color focus-visible:ring-primary focus-visible:ring-1',
              className
            )}
            value={value}
            onChange={onChange}
            {...props}
          />
          {value && (
            <X
              className="size-6 text-zinc-500 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer hover:text-zinc-300 p-1 hover:bg-zinc-700/50 aspect-square rounded-full z-[50]"
              onClick={onClear}
            />
          )}
        </div>
      )}
    </>
  )
}

export default Input
