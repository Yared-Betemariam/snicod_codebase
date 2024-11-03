import logoImage from '@/assets/icon.png'
import { useAppSearch } from '@renderer/store'
import { cn } from '@renderer/utils'
import { Minus } from 'lucide-react'
import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IoHelpSharp } from 'react-icons/io5'
import { PiSidebarSimple } from 'react-icons/pi'
import SearchBar from './app/search-bar'
// PiKey
import { useLicenseKey } from '@renderer/store/license'

// mac checker
const isMac = false

type Props = {
  licenseKeyActive: boolean | undefined
}

const Frame = ({ licenseKeyActive }: Props) => {
  const { toggleSidebar } = useAppSearch()
  const { isActivated } = useLicenseKey((state) => ({
    // openLicensePage: state.open,
    isActivated: state.isActivated
    // setOpenLicensePage: state.setOpen
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

  // const handleLicense = (): void => {
  //   if (isActivated) {
  //     setOpenLicensePage(!openLicensePage)
  //   }
  // }

  const handleShortcuts = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      if (e.key == 'b') {
        toggleSidebar()
      }
      if (e.key == 'h') {
        handleHelp()
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
    <div aria-label="Frame" className={cn('flex min-h-[44px]', isMac && 'pl-[82px]')}>
      {!isMac && (
        <span className="grid place-content-center w-12 dragable border-r border-color">
          <img src={logoImage} alt="logo" className="w-[12px] undragable" />
        </span>
      )}
      <span className="flex">
        {licenseKeyActive && (
          <span
            onClick={toggleSidebar}
            className="h-full grid place-content-center hover:bg-zinc-700/50 w-12"
          >
            <PiSidebarSimple className="size-5 text-zinc-300" />
          </span>
        )}
        {!isMac && (
          <>
            <span
              onClick={handleHelp}
              className="h-full grid place-content-center hover:bg-zinc-700/50 w-12"
            >
              <IoHelpSharp className="size-5 text-zinc-300" />
            </span>
          </>
        )}
        {licenseKeyActive && <SearchBar />}
      </span>

      <div className="flex flex-1 gap-1 items-center px-2">
        <div className="dragable flex-1 h-full" />
      </div>
      {isMac && (
        <span
          onClick={handleHelp}
          className="h-full grid place-content-center hover:bg-zinc-700/50 w-12"
        >
          <IoHelpSharp className="size-5 text-zinc-300" />
        </span>
      )}
      {/* <span
        onClick={handleLicense}
        className={cn(
          'h-full grid place-content-center w-12',
          !isActivated ? 'opacity-50' : 'hover:bg-zinc-700/50 '
        )}
      >
        <TfiKey className="size-5 text-zinc-300" />
      </span> */}
      {!isMac && (
        <div className="flex items-center min-h-full">
          <div
            onClick={handleMininmize}
            className="h-full border-l border-color text-zinc-300  w-12 grid place-content-center hover:bg-white/15"
          >
            <Minus className="size-4" />
          </div>

          <div
            onClick={handleClose}
            className="h-full w-12 grid place-content-center hover:bg-red-600"
          >
            <AiOutlineClose className="size-[18px] text-zinc-300" />
          </div>
        </div>
      )}
    </div>
  )
}
export default Frame
