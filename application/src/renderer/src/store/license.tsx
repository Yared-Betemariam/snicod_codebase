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
  // deactivateLicenseKey: (licenseKey: string) => Promise<apiMessage>
  checkLicenseKey: () => Promise<string | undefined>
  isActivated: boolean | undefined
  // open: boolean
  // setOpen: (value: boolean) => void
  // licenseKey?: string
}

export const useLicenseKey = create<LicenseKeyStore>((set) => ({
  // open: false,
  // setOpen: (value) => set({ open: value }),
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
        window.app.setLicenseKey('')

        return {
          error: true,
          success: false,
          errorMessage: data.error
        }
      }

      window.app.setLicenseKey(data.license_key.key)

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
  // deactivateLicenseKey: async (licenseKey) => {
  //   if (licenseKey === '') {
  //     throw Error('Please enter a valid license key.')
  //   }

  //   try {
  //     const response = await axios.post('https://api.lemonsqueezy.com/v1/licenses/deactivate', {
  //       license_key: licenseKey,
  //       instance_name: 'snicod-license'
  //     })
  //     const data = response.data

  //     if (data.error) {
  //       // window.app.setLicenseKey('')

  //       return {
  //         error: true,
  //         success: false,
  //         errorMessage: data.error
  //       }
  //     }

  //     window.app.setLicenseKey('')

  //     if (data.deactivated) {
  //       set({
  //         isActivated: false
  //       })
  //       return {
  //         error: false,
  //         success: true,
  //         errorMessage: ''
  //       }
  //     }
  //   } catch (error: unknown) {
  //     console.log(error)

  //     if (error instanceof AxiosError) {
  //       console.log(error)
  //       return {
  //         error: true,
  //         success: false,
  //         errorMessage:
  //           error.status == 422
  //             ? 'Invalid license key!'
  //             : error.status == 404
  //               ? 'Invalid license key!'
  //               : error.status == 400
  //                 ? 'License key already activated by another user!'
  //                 : error.message
  //       }
  //     } else {
  //       return {
  //         error: true,
  //         success: false,
  //         errorMessage: 'An error occurred, please try again'
  //       }
  //     }
  //   }

  //   return {
  //     error: false,
  //     success: true,
  //     errorMessage: ''
  //   }
  // },
  checkLicenseKey: async () => {
    const licenseKey = await window.app.getLicenseKey()
    let errorMessage: undefined | string
    if (licenseKey) {
      set({
        isActivated: true
        // licenseKey
      })
    } else {
      set({
        isActivated: false
      })
      errorMessage = 'License key not detected!'
    }
    return errorMessage
  }
}))
