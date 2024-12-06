import { cn } from '@renderer/utils'

const Shortcut = ({
  text,
  titleKey,
  className
}: {
  text: string
  className?: string
  titleKey: string
}) => {
  return (
    <div className={cn('flex gap-0.5', className)}>
      {text.split('+').map((item, index) => (
        <div className="flex gap-0.5" key={`${titleKey}${item}`}>
          <span className="bg-neutral-700/35 px-[4px] border-b border-b-neutral-200/10 py-[1px] rounded">
            {item}
          </span>{' '}
          {index !== text.split('+').length - 1 && <span>+</span>}
        </div>
      ))}
    </div>
  )
}
export default Shortcut
