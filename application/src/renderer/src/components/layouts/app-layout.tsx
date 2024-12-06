import { useSettings, useSidebar, useSnippets } from '@renderer/store'
import { useLicenseKey, useTrial } from '@renderer/store/license'
import { updateSettingsData } from '@renderer/utils'
import { useEffect } from 'react'
import Sidebar from '../app/sidebar'
import Frame from '../Frame'
import LicensePage from './license'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { sidebarOpen } = useSidebar((state) => ({
    sidebarOpen: state.sidebarOpen
  }))

  const {
    isActivated: isActivated,
    checkLicenseKey,
    licensePageOpen
  } = useLicenseKey((state) => ({
    isActivated: state.isActivated,
    checkLicenseKey: state.checkLicenseKey,
    licensePageOpen: state.licensePageOpen
  }))

  const { freeTrialActive, checkFreeTrial } = useTrial((state) => ({
    freeTrialActive: state.freeTrialActive,
    checkFreeTrial: state.checkFreeTrial
  }))

  const isActivatedx = false

  useEffect(() => {
    const initializeApp = async () => {
      await useSettings.getState().loadTheme()
      await updateSettingsData()
      await checkFreeTrial()
      await checkLicenseKey()
      await useSnippets.getState().loadSnippets()
    }

    initializeApp()
  }, [])

  const canAccessApp = (isActivated !== undefined && isActivated) || freeTrialActive
  return (
    <main className="h-full flex flex-1">
      {sidebarOpen && canAccessApp && !licensePageOpen && <Sidebar />}
      <div className="flex flex-col w-full flex-1">
        <Frame licenseKeyActive={canAccessApp && !licensePageOpen} />
        {isActivated !== undefined &&
          (canAccessApp && !licensePageOpen ? <>{children}</> : <LicensePage />)}
      </div>
    </main>
  )
}
export default AppLayout
