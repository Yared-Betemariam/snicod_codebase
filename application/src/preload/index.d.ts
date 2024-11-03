import { ElectronAPI } from '@electron-toolkit/preload'
import { GetLicenseKey, SetLicenseKey } from '@shared/index'

declare global {
  interface Window {
    electron: ElectronAPI
    frame: {
      closeWindow: () => void
      minimizeWindow: () => void
    }
    app: {
      openHelpWindow: () => void
      setLicenseKey: SetLicenseKey
      getLicenseKey: GetLicenseKey
    }
  }
}
