import { cn } from '@renderer/utils'

const Shortcut = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={cn('flex gap-0.5', className)}>
      {text.split('+').map((item, index) => (
        <>
          <span className="bg-zinc-700/35 px-[4px] border-b border-b-zinc-200/10 py-[1px] rounded">
            {item}
          </span>{' '}
          {index !== text.split('+').length - 1 && <span>+</span>}
        </>
      ))}
    </div>
  )
}
export default Shortcut
