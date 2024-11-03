import { SetLicenseKey } from '@shared/index'
import electronStore from 'electron-store'

export const handleSetLicenseKey: SetLicenseKey = (key: string) => {
  try {
    const store = new electronStore()
    // console.log('setting license key', key)
    store.set('licenseKey', key)
  } catch (error) {
    console.log(error)
  }
}

export const handleGetLicenseKey = () => {
  try {
    const store = new electronStore()
    const key = store.get('licenseKey') as string
    return key || undefined
  } catch (error) {
    console.log(error)
  }
  return undefined
}
