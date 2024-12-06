import { ElectronAPI } from '@electron-toolkit/preload'
import {
  CheckFreeTrial,
  GetLicenseKey,
  GetSettingsData,
  ImportAppData,
  SetLicenseKey,
  SetSettingsData,
  StartFreeTrial,
  Theme
} from '@shared/index'

declare global {
  interface Window {
    electron: ElectronAPI
    frame: {
      closeWindow: () => void
      minimizeWindow: () => void
    }
    app: {
      openHelpWindow: () => void
      openAppWebsite: () => void
      toggleDarkMode: (value: Theme) => boolean
      getCurrentTheme: () => Theme
      setLicenseKey: SetLicenseKey
      getLicenseKey: GetLicenseKey
      checkFreeTrial: CheckFreeTrial
      startFreeTrial: StartFreeTrial
      importAppData: ImportAppData
      importAppData: ImportAppData
      getSettingsData: GetSettingsData
      setSettingsData: SetSettingsData
    }
  }
}
