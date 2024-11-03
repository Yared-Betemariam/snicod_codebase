import { useSidebar, useSnippets } from '@renderer/store'
import { useLicenseKey } from '@renderer/store/license'
import { useEffect } from 'react'
import Sidebar from '../app/sidebar'
import Frame from '../Frame'
import LicensePage from './license'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { sidebarOpen, setSidebarOpen, setSidebarWidth } = useSidebar((state) => ({
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: state.setSidebarOpen,
    setSidebarWidth: state.setSidebarWidth
  }))
  const { isActivated: isActivated, checkLicenseKey } = useLicenseKey((state) => ({
    isActivated: state.isActivated,
    checkLicenseKey: state.checkLicenseKey
  }))

  useEffect(() => {
    checkLicenseKey()
    useSnippets.getState().loadSnippets()

    const sidebarOpenStorage = localStorage.getItem('sidebarOpen')
    if (sidebarOpenStorage) {
      setSidebarOpen(JSON.parse(sidebarOpenStorage))
    }

    const sidebarWidthStorage = localStorage.getItem('sidebarWidth')
    if (sidebarWidthStorage) {
      setSidebarWidth(JSON.parse(sidebarWidthStorage))
    }
  }, [])

  return (
    <main className="h-full flex flex-col">
      <Frame licenseKeyActive={isActivated} />
      <div className="flex w-full flex-1">
        {isActivated !== undefined &&
          (isActivated ? (
            <>
              {sidebarOpen && <Sidebar />}
              {children}
            </>
          ) : (
            <LicensePage />
          ))}
      </div>
    </main>
  )
}
export default AppLayout
