import { cn } from '@renderer/utils'
import { ButtonHTMLAttributes } from 'react'

export const OutlinedButton = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'px-3 flex justify-center items-center gap-1.5 outline-none rounded-md py-2 text-[12.5px] font-medium disabled:opacity-60 duration-200 transition-all disabled:cursor-not-allowed border border-neutral-900/25 dark:border-neutral-100/25 hover:bg-neutral-500/5',
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}

const Button = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'px-3 flex justify-center items-center gap-1.5 outline-none rounded-md py-2 text-[12.5px] font-medium disabled:opacity-60 duration-200 transition-all disabled:cursor-not-allowed bg-neutral-700/90 dark:bg-neutral-700/50 hover:bg-neutral-700/80 dark:hover:bg-neutral-700/40 text-neutral-100',
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}
export default Button
