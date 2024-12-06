import { Trial } from '@shared/index'
import axios, { AxiosError } from 'axios'
import { create } from 'zustand'

const LMSQVITEACTIVATEURL = 'https://api.lemonsqueezy.com/v1/licenses/activate'

export type apiMessage = {
  success: boolean
  error: boolean
  errorMessage: string
}

interface LicenseKeyStore {
  activateLicenseKey: (licenseKey: string) => Promise<apiMessage>
  deactivateLicenseKey: (licenseKey: string) => Promise<apiMessage>
  checkLicenseKey: () => Promise<string | undefined>
  isActivated: boolean | undefined
  licenseKey?: string
  instance_id?: string
  licensePageOpen: boolean
  setLicensePageOpen: (licensePageOpen: boolean) => void
}

interface TrialStore {
  trialData?: Trial | undefined
  freeTrialActive?: boolean | undefined
  startFreeTrial: () => Promise<void>
  checkFreeTrial: () => Promise<void>
}

export const useLicenseKey = create<LicenseKeyStore>((set) => ({
  licenseKey: undefined,
  instance_id: undefined,
  licensePageOpen: false,
  setLicensePageOpen: (licensePageOpen) => set({ licensePageOpen }),
  isActivated: undefined,
  activateLicenseKey: async (licenseKey) => {
    if (licenseKey === '') {
      throw Error('Please enter a valid license key.')
    }

    try {
      const response = await axios.post('https://api.lemonsqueezy.com/v1/licenses/activate', {
        license_key: licenseKey,
        instance_name: 'snicod-license'
      })
      const data = response.data

      if (data.error) {
        window.app.setLicenseKey('', '')

        return {
          error: true,
          success: false,
          errorMessage: data.error
        }
      }

      window.app.setLicenseKey(data.license_key.key, data.instance.id)

      if (data.activated) {
        set({
          isActivated: true
        })
        return {
          error: false,
          success: true,
          errorMessage: ''
        }
      }
    } catch (error: unknown) {
      console.log(error)

      if (error instanceof AxiosError) {
        return {
          error: true,
          success: false,
          errorMessage:
            error.status == 422
              ? 'Invalid license key!'
              : error.status == 404
                ? 'Invalid license key!'
                : error.status == 400
                  ? 'License key already activated by another user!'
                  : error.message
        }
      } else {
        return {
          error: true,
          success: false,
          errorMessage: 'An error occurred, please try again'
        }
      }
    }

    return {
      error: false,
      success: true,
      errorMessage: ''
    }
  },
  deactivateLicenseKey: async (licenseKey) => {
    if (licenseKey === '') {
      throw Error('Please enter a valid license key.')
    }

    try {
      const instance_id = useLicenseKey.getState().instance_id
      if (!instance_id) {
        return {
          error: true,
          success: false,
          errorMessage: 'license_id is missing. please reopen the app and try again.'
        }
      }
      const response = await axios.post('https://api.lemonsqueezy.com/v1/licenses/deactivate', {
        license_key: licenseKey,
        instance_name: 'snicod-license',
        instance_id
      })
      const data = response.data

      if (data.error) {
        return {
          error: true,
          success: false,
          errorMessage: data.error
        }
      }

      window.app.setLicenseKey('', '')

      if (data.deactivated) {
        set({
          isActivated: false,
          licenseKey: undefined,
          instance_id: undefined
        })
        return {
          error: false,
          success: true,
          errorMessage: ''
        }
      }
    } catch (error: unknown) {
      console.log(error)

      if (error instanceof AxiosError) {
        console.log(error)
        return {
          error: true,
          success: false,
          errorMessage:
            error.status == 422
              ? 'Invalid license key!'
              : error.status == 404
                ? 'Invalid license key!'
                : error.status == 400
                  ? 'License key already activated by another user!'
                  : error.message
        }
      } else {
        return {
          error: true,
          success: false,
          errorMessage: 'An error occurred, please try again'
        }
      }
    }

    return {
      error: false,
      success: true,
      errorMessage: ''
    }
  },
  checkLicenseKey: async () => {
    const licenseKey = await window.app.getLicenseKey()
    set({
      isActivated: !!licenseKey,
      licenseKey: licenseKey?.key || undefined,
      instance_id: licenseKey?.instance_id || undefined
    })
    return !licenseKey ? 'License key not detected!' : undefined
  }
}))

export const useTrial = create<TrialStore>((set, get) => ({
  startFreeTrial: async () => {
    const trial = await window.app.startFreeTrial()
    set({
      trialData: trial
    })
    get().checkFreeTrial()
  },
  checkFreeTrial: async () => {
    const trial = await window.app.checkFreeTrial()
    if (!trial) {
      return
    }

    set({
      trialData: trial
    })

    const now = new Date()
    const trialEndDate = new Date(trial.endDate)
    console.log(trial)
    if (now > trialEndDate) {
      set({
        freeTrialActive: false
      })
    }
    if (now <= trialEndDate) {
      set({
        freeTrialActive: true
      })
    }
  }
}))
