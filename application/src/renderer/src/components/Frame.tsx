import logoBlackImage from '@/assets/icon-black.png'
import logoImage from '@/assets/icon.png'
import { useAppSearch, useModals, useSidebar } from '@renderer/store'
import { useLicenseKey } from '@renderer/store/license'
import { cn } from '@renderer/utils'
import { isMac } from '@shared/index'
import { Minus } from 'lucide-react'
import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IoHelpSharp } from 'react-icons/io5'
import { PiSidebarSimple } from 'react-icons/pi'
import SearchBar from './app/search-bar'
import SettingsModal from './layouts/settings'
import { Hint } from './ui/tooltip'

type Props = {
  licenseKeyActive: boolean | undefined
}

const Frame = ({ licenseKeyActive }: Props) => {
  const { toggleSidebar } = useAppSearch()
  const sidebarOpen = useSidebar((state) => state.sidebarOpen)
  const { setShowSettingsModal, setShowSearchPopover } = useModals((state) => ({
    setShowSettingsModal: state.setShowSettingsModal,
    setShowSearchPopover: state.setShowSearchPopover
  }))
  const { licensePageOpen } = useLicenseKey((state) => ({
    licensePageOpen: state.licensePageOpen
  }))
  const handleMininmize = (): void => {
    window.frame.minimizeWindow()
  }

  const handleClose = (): void => {
    window.frame.closeWindow()
  }

  const handleHelp = (): void => {
    window.app.openHelpWindow()
  }

  const handleShortcuts = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      if (e.key == 'b') {
        toggleSidebar()
      }
      if (e.key == 'h') {
        handleHelp()
      }
      if (e.key == 'Tab') {
        setShowSearchPopover(true)
      }
      if (e.key == 's') {
        setShowSettingsModal(true)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleShortcuts)
    return () => {
      document.removeEventListener('keydown', handleShortcuts)
    }
  }, [])

  return (
    <div
      aria-label="Frame"
      className={cn(
        'flex min-h-[44px] border-l border-color max-h-[44px]',
        isMac && !sidebarOpen && 'pl-[82px]',
        licenseKeyActive && 'bg-[#fefefe] dark:bg-[#1d1d1d]'
      )}
    >
      {!isMac && (!sidebarOpen || !licenseKeyActive) && (
        <span className="grid place-content-center w-12 border-r border-transparent dragable">
          <img src={logoImage} alt="logo" className="w-[12px] hidden dark:inline undragable" />
          <img src={logoBlackImage} alt="logo" className="w-[12px] inline dark:hidden undragable" />
        </span>
      )}
      <span className="flex">
        {licenseKeyActive && !licensePageOpen && (
          <Hint hint="Toggle Sidebar,Ctrl+B">
            <span
              onClick={toggleSidebar}
              className="h-full grid place-content-center hover:bg-neutral-300/40 dark:hover:bg-neutral-700/50 w-12"
            >
              <PiSidebarSimple className="size-5 text-neutral-500 dark:text-neutral-400" />
            </span>
          </Hint>
        )}
        {!isMac && (
          <Hint hint="Help,Ctrl+H">
            <span
              onClick={handleHelp}
              className="h-full grid place-content-center hover:bg-neutral-300/40 dark:hover:bg-neutral-700/50 w-12"
            >
              <IoHelpSharp className="size-5 text-neutral-500 dark:text-neutral-400" />
            </span>
          </Hint>
        )}
        {licenseKeyActive && <SearchBar />}
      </span>

      <div className="flex flex-1 gap-1 items-center px-2">
        <div className="dragable flex-1 h-full" />
      </div>
      <SettingsModal />

      {isMac && (
        <Hint hint="Help,Ctrl+H">
          <span
            onClick={handleHelp}
            className="h-full grid place-content-center hover:bg-neutral-300/40 dark:hover:bg-neutral-700/50 w-12"
          >
            <IoHelpSharp className="size-5 text-neutral-500 dark:text-neutral-400" />
          </span>
        </Hint>
      )}
      {!isMac && (
        <div className="flex items-center min-h-full">
          <div
            onClick={handleMininmize}
            className="h-full text-neutral-500 dark:text-neutral-400  w-12 grid place-content-center hover:bg-neutral-300/40 dark:hover:bg-neutral-700/50"
          >
            <Minus className="size-4" />
          </div>

          <div
            onClick={handleClose}
            className="h-full w-12 grid place-content-center hover:text-neutral-100 dark:hover:bg-red-600 hover:bg-red-500 text-neutral-500 dark:text-neutral-400"
          >
            <AiOutlineClose className="size-[18px] " />
          </div>
        </div>
      )}
    </div>
  )
}
export default Frame
