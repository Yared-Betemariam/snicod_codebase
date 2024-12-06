import { cn } from '@renderer/utils'
import { ListFilter, X } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  isFilterBar?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
  inputClassName?: string
}

const Input = ({
  className,
  isFilterBar,
  value,
  onChange,
  onClear,
  inputClassName,
  ...props
}: Props) => {
  return (
    <>
      {isFilterBar ? (
        <div className={cn('relative h-fit w-full flex', className)}>
          <input
            className={cn(
              'pl-8 pr-4 h-fit w-full text-sm py-1 bg-zinc-800 outline-none border border-color rounded-md focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-transparent placeholder:text-blue-600/50 dark:placeholder:text-zinc-400/50',
              inputClassName
            )}
            value={value}
            onChange={onChange}
            {...props}
          />
          <ListFilter className="size-4 text-zinc-500 absolute top-1/2 -translate-y-1/2 left-2" />
          {value && (
            <X
              className="size-6 text-zinc-600 dark:text-zinc-500 absolute top-1/2 -translate-y-1/2 right-1.5 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-300 p-1 hover:bg-zinc-400/10 dark:hover:bg-zinc-700/20 aspect-square rounded z-[50]"
              onClick={onClear}
            />
          )}
        </div>
      ) : (
        <div className={cn('relative flex h-fit w-full', className)}>
          <input
            className={cn(
              'px-3 w-full text-sm py-1 bg-transparent rounded-md placeholder:text-zinc-600/50 dark:placeholder:text-zinc-500/50 outline-none border border-color focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-transparent',
              inputClassName
            )}
            value={value}
            onChange={onChange}
            {...props}
          />
          {value && onClear && (
            <X
              className="size-6 text-zinc-600 dark:text-zinc-500 absolute top-1/2 -translate-y-1/2 right-1.5 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-300 p-1 hover:bg-zinc-400/10 dark:hover:bg-zinc-700/20 aspect-square rounded z-[50]"
              onClick={onClear}
            />
          )}
        </div>
      )}
    </>
  )
}

export default Input
