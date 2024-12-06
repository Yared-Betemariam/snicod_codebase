import { useLicenseKey, useTrial } from '@renderer/store/license'
import { ArrowRight, Loader, X } from 'lucide-react'
import { useState } from 'react'
import { BsExclamationCircle, BsExclamationTriangle } from 'react-icons/bs'
import Button, { OutlinedButton } from '../ui/button'
import Input from '../ui/input'

const LicensePage = () => {
  const { activateLicenseKey, licensePageOpen, setLicensePageOpen } = useLicenseKey((state) => ({
    activateLicenseKey: state.activateLicenseKey,
    licensePageOpen: state.licensePageOpen,
    setLicensePageOpen: state.setLicensePageOpen
  }))
  const { startFreeTrial, trialData, freeTrialActive } = useTrial((state) => state)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleActivateDeactivate = () => {
    setError('')

    if (inputValue === '') {
      setError("License key can't be empty!")
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    try {
      setIsLoading(true)
      activateLicenseKey(inputValue)
        .then((data) => {
          if (data.error) {
            setError(data.errorMessage)
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => setIsLoading(false))
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  const handleFreeTrial = async () => {
    try {
      setIsLoading(true)
      startFreeTrial()
        .catch((error) => {
          console.log(error)
        })
        .finally(() => setIsLoading(false))
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <div className="flex flex-col relative border-t-0 border-color flex-1 gap-2 max-h-[calc(100vh-44px)] bg-[#feffe] dark:bg-[#1d1dd]">
      {licensePageOpen && freeTrialActive && (
        <span
          className="size-10 grid place-content-center absolute top-6 right-6 hover:bg-zinc-200 z-50 rounded dark:hover:bg-zinc-800"
          onClick={() => setLicensePageOpen(false)}
        >
          <X className="size-5" />
        </span>
      )}
      <span className="bg-gradient-to-tr from-neutral-400/15 dark:from-neutral-700/15 border-l border-neutral-400/50 dark:border-neutral-700/50 to-transparent size-[100vh] absolute top-0 left-1/2 rounded-full" />
      <div className=" flex flex-col z-10 max-w-[26.5rem] mx-auto my-auto gap-4">
        <span className="text-[2.75rem] leading-[1.1] font-bold tracking-tighter">
          Activate your License
        </span>
        <div className="flex text-sm leading-[1.4] flex-col gap-2">
          <p>
            You can purchase a license key for our official website{' '}
            <span onClick={() => window.app.openAppWebsite()} className="link-color underline">
              https://snicod.pro
            </span>
            .You will need to have an internet connection to activate your license.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 mb-1">
            <label htmlFor="" className="text-neutral-600 dark:text-neutral-500 text-xs uppercase">
              License Key
            </label>
            <Input
              autoFocus
              onClear={() => setInputValue('')}
              value={inputValue}
              className="h-[32px]"
              onChange={(e) => setInputValue(e.target.value)}
            />
            {error && (
              <span className="text-sm duration-300 transition-all flex items-center error-color">
                <BsExclamationTriangle className="inline size-3.5 mr-1.5" />
                {error}
              </span>
            )}
          </div>
          <Button
            onClick={handleActivateDeactivate}
            disabled={isLoading}
            className="bg-primary dark:bg-primary h-[34px] duration-200 transition-all dark:hover:bg-primary/90 hover:bg-primary/90 mt-auto"
          >
            {isLoading && <Loader className="size-4 animate-spin" />}
            <span>Activate</span>
          </Button>
          {!trialData && freeTrialActive !== false && (
            <OutlinedButton onClick={handleFreeTrial} disabled={isLoading} className="relative h-8">
              <span>Start Free Trial</span>
              <ArrowRight className="size-4 mr-2 inline absolute top-1/2 -translate-y-1/2 right-1 opacity-50" />
            </OutlinedButton>
          )}
          {freeTrialActive === false && (
            <span className="text-sm duration-300 transition-all flex items-center alert-color">
              <BsExclamationCircle className="inline size-3.5 mr-1.5" />
              Free trial ended, purchase licence to contiune
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
export default LicensePage
