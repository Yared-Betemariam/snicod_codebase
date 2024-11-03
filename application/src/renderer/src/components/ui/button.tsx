import { cn } from '@renderer/utils'
import { ButtonHTMLAttributes } from 'react'

const Button = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'bg-zinc-700/50 px-2 flex justify-center items-center gap-1.5 outline-none text-zinc-200 rounded-md py-1 text-[12.5px] font-medium hover:bg-zinc-700/40 disabled:opacity-50',
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}
export default Button
