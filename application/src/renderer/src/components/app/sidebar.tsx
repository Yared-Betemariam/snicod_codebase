import { useAppSearch, useSidebar } from '@renderer/store'
import { useEffect, useRef, useState } from 'react'
import { VscCollapseAll } from 'react-icons/vsc'
import Input from '../ui/input'
import NewSnippetModal from './new-snippet'
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
    if (e.clientX > 150 && e.clientX < 270) {
      setSidebarOpen(true)
      setSidebarWidth(e.clientX)
    }
    if (e.clientX < 30) {
      setSidebarWidth(250)
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
        className="relative bg-zinc-950/10 flex flex-col gap-1"
      >
        <div className=" border-r-0 border-t border-color justify-between h-[54px] flex items-center px-4">
          <p className="font-light text-zinc-400/50 text-[13px] uppercase">Snippets</p>
          <div className="flex items-center gap-2">
            {' '}
            <NewSnippetModal />
            <VscCollapseAll
              onClick={() => setExpanded({})}
              className="size-4 opacity-50 hover:opacity-100 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col px-2">
          <Input
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            isFilterBar
            onClear={() => setFilterInput('')}
            className="bg-transparent"
          />
        </div>
        <SnippetsList onExpand={onExpand} expanded={expanded} />
        <span
          ref={sidebarRef}
          className="absolute w-4 z-50 -right-2  flex inset-y-0 group/resize hover:cursor-col-resize"
          onMouseDown={startResizing}
        >
          <span className="w-[4px] mx-auto group-hover/resize:bg-zinc-700/50 h-full group-hover/resize:cursor-col-resize " />
        </span>
      </aside>
    </>
  )
}
export default Sidebar
