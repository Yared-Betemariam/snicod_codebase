import { useModals } from '@renderer/store'
import { useLicenseKey, useTrial } from '@renderer/store/license'
import { cn } from '@renderer/utils'
import { Check, Clock, Copy, Eye, EyeOff, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BsExclamationTriangle } from 'react-icons/bs'
import Button from '../ui/button'

const LicenseManagment = () => {
  const { endDate, freeTrialMode } = useTrial((state) => ({
    endDate: state.trialData?.endDate,
    freeTrialMode: state.freeTrialActive
  }))
  const { licenseKey, isActivated, deactivateLicenseKey, checkLicenseKey, setLicensePageOpen } =
    useLicenseKey()
  const [hidden, setHidden] = useState(true)
  const setShowSettingsModal = useModals((state) => state.setShowSettingsModal)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDeactivate = () => {
    setError('')

    if (licenseKey === '') {
      setError('License key cannot be empty')
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    try {
      setIsLoading(true)
      deactivateLicenseKey(licenseKey || '')
        .then((data) => {
          if (data.error) {
            setError(data.errorMessage)
          } else {
            setShowSettingsModal(false)
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

  const handleActivate = () => {
    if (freeTrialMode) {
      setLicensePageOpen(true)
      setShowSettingsModal(false)
    }
  }

  useEffect(() => {
    if (!licenseKey) {
      checkLicenseKey()
    }
  }, [])

  const handleCopyKey = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1500)
    }
  }

  if (isActivated === undefined) {
    return <Loader className="size-5 text-neutral-500 animate-spin" />
  }

  const [timeLeft, setTimeLeft] = useState<string | null>(null)

  useEffect(() => {
    if (endDate) {
      const interval = setInterval(() => {
        const now = new Date()
        const end = new Date(endDate)
        const diff = end.getTime() - now.getTime()

        if (diff <= 0) {
          setTimeLeft('Expired')
          clearInterval(interval)
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
          const minutes = Math.floor((diff / (1000 * 60)) % 60)

          setTimeLeft(`${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m`)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [endDate])

  return (
    <div className="flex flex-col gap-2 text-sm">
      {freeTrialMode && (
        <>
          <p className="text-[15px]">Free Trial</p>
          <p>Currently you are on a free trial mode.</p>
          <button
            onClick={handleActivate}
            disabled={isLoading || !freeTrialMode}
            className="link-color w-fit"
          >
            Activate to pro
          </button>
          <span className="w-full border-t separator my-2" />
          <div className="flex flex-col rounded bg-zinc-300/25 dark:bg-zinc-900/25 px-4 py-2">
            <p className="opacity-50 dark:opacity-25">Time left until the trial is over</p>
            <p className="text-base font-medium flex items-center">
              <Clock className="size-4 mr-2 inline" />{' '}
              <span>{timeLeft ? timeLeft : '-d -h -m'}</span>
            </p>
          </div>
        </>
      )}
      {licenseKey && (
        <>
          <p className="text-base">License key</p>
          <p>You can deactivate it from this device if you want.</p>
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <label className="text-neutral-600 dark:text-neutral-500 text-xs uppercase">
                License Key
              </label>
              <span
                onClick={() => setHidden((prev) => !prev)}
                className="size-8 min-w-8 hover:bg-neutral-700/25 rounded-md grid place-content-center ml-auto"
              >
                {hidden ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </span>
              <span
                onClick={() => handleCopyKey()}
                className={cn(
                  'size-8 min-w-8 hover:bg-neutral-700/25 rounded-md grid place-content-center',
                  copied || !licenseKey ? 'opacity-40' : 'hover:opacity-80 cursor-pointer'
                )}
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </span>
            </div>
            <input
              readOnly
              className={cn(
                'px-3 w-full text-sm py-1 bg-transparent rounded-md placeholder:text-neutral-400/50 outline-none border border-color focus-visible:ring-primary focus-visible:ring-1'
              )}
              value={licenseKey}
              type={hidden ? 'password' : 'text'}
            />
            {error && (
              <p className="flex gap-2 items-center bg-red-400/25 dark:bg-red-700/25 text-red-700 dark:text-red-300 mb-2 text-sm rounded-md font-light px-2.5 py-1">
                <BsExclamationTriangle className="size-4" /> <span>{error}</span>
              </p>
            )}
            <Button
              onClick={handleDeactivate}
              disabled={isLoading}
              className="ml-auto bg-red-600 hover:bg-red-600/80 dark:bg-red-600 dark:hover:bg-red-600/80 mt-2"
            >
              {isLoading && <Loader className="size-4 animate-spin" />}
              <span>Deactivate</span>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
export default LicenseManagment
