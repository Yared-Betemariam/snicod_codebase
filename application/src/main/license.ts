import {
  CheckFreeTrial,
  GetLicenseKey,
  LicenseData,
  SetLicenseKey,
  StartFreeTrial,
  Trial
} from '@shared/index'
import electronStore from 'electron-store'

export const handleSetLicenseKey: SetLicenseKey = (key, instance_id) => {
  try {
    const store = new electronStore()
    console.log('setting license key', key)
    if (key === '') {
      store.delete('licenseKey')
    } else {
      store.set('licenseKey', {
        key,
        instance_id
      } as LicenseData)
    }
  } catch (error) {
    console.log(error)
  }
}

export const handleGetLicenseKey: GetLicenseKey = () => {
  try {
    const store = new electronStore()
    // store.delete('trial')
    const key = store.get('licenseKey')
    console.log('gettingkey', key)
    return key ? (key as LicenseData) : undefined
  } catch (error) {
    console.log(error)
  }
  return undefined
}

export const startFreeTrial: StartFreeTrial = () => {
  const store = new electronStore()
  const prevTrial = store.get('trial')
  if (prevTrial) {
    return prevTrial as Trial
  }

  const trialDuration = 0.1
  const startDate = new Date()
  const endDate = new Date()
  endDate.setTime(startDate.getTime() + trialDuration * 24 * 60 * 60 * 1000)

  const trial: Trial = {
    startDate,
    endDate
  }

  store.set('trial', trial)

  return trial
}

export const checkFreeTrial: CheckFreeTrial = () => {
  const store = new electronStore()
  const trial = store.get('trial')
  return trial ? (trial as Trial) : undefined
}
