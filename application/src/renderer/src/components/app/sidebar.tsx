import logoBlackImage from '@/assets/icon-black.png'
import logoImage from '@/assets/icon.png'
import { useAppSearch, useSidebar } from '@renderer/store'
import { cn } from '@renderer/utils'
import { isMac } from '@shared/index'
import { useEffect, useRef, useState } from 'react'
import { VscCollapseAll } from 'react-icons/vsc'
import Input from '../ui/input'
import NewSnippetModal from './new-snippet'
import Plan from './plan'
import SnippetsList from './snippet-list'

const Sidebar = () => {
  const { expanded, setExpanded } = useAppSearch()
  const { sidebarWidth, setSidebarOpen, setSidebarWidth, sidebarOpen } = useSidebar((state) => ({
    sidebarWidth: state.sidebarWidth,
    setSidebarWidth: state.setSidebarWidth,
    setSidebarOpen: state.setSidebarOpen,
    sidebarOpen: state.sidebarOpen
  }))
  const { filterInput, setFilterInput } = useSidebar()

  const [isResizing, setIsResizing] = useState<boolean>(false)
  const sidebarRef = useRef<HTMLSpanElement>(null)

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  const stopResizing = () => {
    setIsResizing(false)
  }

  const resizeSidebar = (e: MouseEvent) => {
    if (!isResizing || !sidebarRef.current) return
    if (e.clientX > 176 && e.clientX < 270) {
      setSidebarOpen(true)
      setSidebarWidth(e.clientX)
    }
    if (e.clientX < 30) {
      setSidebarWidth(0)
      setSidebarOpen(false)
    }
  }

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resizeSidebar)
      window.addEventListener('mouseup', stopResizing)
    } else {
      window.removeEventListener('mousemove', resizeSidebar)
      window.removeEventListener('mouseup', stopResizing)
    }

    return () => {
      window.removeEventListener('mousemove', resizeSidebar)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [isResizing, sidebarOpen])

  const onExpand = (id: string) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id]
    })
  }

  return (
    <>
      <aside
        style={{
          width: `${sidebarWidth}px`
        }}
        className="relative bg-neutral-100/75 dark:bg-neutral-950/10 flex flex-col"
      >
        <div className={cn('h-[44px] flex items-center w-full ', isMac && 'pl-[82px]')}>
          {!isMac && (
            <span className="grid place-content-center w-12">
              <img src={logoImage} alt="logo" className="w-[12px] hidden dark:inline undragable" />
              <img
                src={logoBlackImage}
                alt="logo"
                className="w-[12px] inline dark:hidden undragable"
              />
            </span>
          )}
          <Plan />
          <div className="w-full flex-1 h-full dragable" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="border-r-0 justify-between  mb-2 h-[26px] flex items-end px-4">
            <p className="font-normal dark:font-light text-neutral-600/75 dark:text-neutral-400/50 text-[13px] uppercase">
              Snippets
            </p>
            <div className="flex items-center gap-2">
              {' '}
              <NewSnippetModal />
              <VscCollapseAll
                onClick={() => setExpanded({})}
                className="size-4 opacity-75 dark:opacity-50 hover:opacity-100 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col px-2">
            <Input
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              isFilterBar
              onClear={() => setFilterInput('')}
              inputClassName="bg-transparent"
            />
          </div>
          <SnippetsList onExpand={onExpand} expanded={expanded} />
          <span
            ref={sidebarRef}
            className="absolute w-3 z-50 -right-2  flex inset-y-0 group/resize hover:cursor-col-resize"
            onMouseDown={startResizing}
          >
            <span className="w-[2px] mx-auto group-hover/resize:bg-neutral-300/50 dark:group-hover/resize:bg-neutral-700/50 h-full group-hover/resize:cursor-col-resize " />
          </span>
        </div>
      </aside>
    </>
  )
}
export default Sidebar
