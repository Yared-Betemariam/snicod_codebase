import { useLicenseKey } from '@renderer/store/license'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { BsExclamationTriangle } from 'react-icons/bs'
import Button from '../ui/button'
import Input from '../ui/input'

const LicensePage = () => {
  const { activateLicenseKey } = useLicenseKey((state) => ({
    activateLicenseKey: state.activateLicenseKey
  }))
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleActivateDeactivate = () => {
    setError('')

    if (inputValue === '') {
      setError('License key cannot be empty')
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    try {
      setIsLoading(true)
      // if (isActivated == false) {
      //   deactivateLicenseKey(inputValue)
      //     .then((data) => {
      //       if (data.error) {
      //         setError(data.errorMessage)
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })
      //     .finally(() => setIsLoading(false))
      // } else {
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
      // }
      // checkLicenseKey()
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <div className="flex flex-col relative border-t border-color flex-1 gap-2 max-h-[calc(100vh-44px)] overflow-scroll">
      {/* <span
        onClick={() => {
          setOpen(false)
        }}
        className="p-1 hover:bg-zinc-700/25 rounded-md transition-all duration-100 absolute top-4 right-4"
      >
        <X className="size-5" />
      </span> */}
      <div className="max-w-[44rem] mx-auto flex relative flex-col overflow-hidden pt-12 pb-4 px-8 gap-2 justify-center">
        <span className="text-2xl font-medium">Activate License</span>
        <div className="flex text-zinc-400 text-sm leading-[1.4] flex-col mb-4 gap-2">
          {/* <p>
            You can purchase a license key for our official website{' '}
            <span className="text-primary underline cursor-pointer hover:brightness-125">
              snicod.pro
            </span>
            , then copy the license key below and click activate to start using snicod
          </p> */}
          <p>
            You can purchase a license key for our official website{' '}
            <span className="text-primary underline cursor-pointer hover:brightness-125">
              snicod.pro
            </span>
            . You will need to have an internet connection the first time you open it to activate
            your license.
          </p>
        </div>
      </div>
      <div className=" w-full bg-zinc-950/15 h-full flex">
        <div className=" max-w-[44rem] mx-auto z-10 flex flex-col w-full px-8 py-4 gap-2 ">
          <div className="flex flex-col gap-1 mb-1">
            <label htmlFor="" className="text-zinc-500 text-xs uppercase">
              License Key
            </label>
            <Input
              autoFocus
              onClear={() => setInputValue('')}
              value={inputValue}
              className="h-[32px]"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          {/* <div className="flex items-center gap-2 mb-1">
            <label htmlFor="" className="text-zinc-500 text-xs uppercase">
              Status:
            </label>
            <span
              className={cn(
                'text-sm font-light',
                isActivated ? ' text-emerald-300' : 'text-red-300'
              )}
            >
              {isActivated ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div> */}
          {error && (
            <p className="flex gap-2 items-center bg-red-700/25 text-red-300 mb-2 text-sm rounded-md px-2.5 py-1.5">
              <BsExclamationTriangle className="size-4" /> <span>{error}</span>
            </p>
          )}
          <Button
            onClick={handleActivateDeactivate}
            disabled={isLoading}
            className="bg-primary h-[32px] duration-200 transition-all hover:bg-primary/90 mt-auto"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {/* <span>{isActivated ? 'Deactivate' : 'Activate'}</span> */}
            <span>Activate</span>
          </Button>
        </div>
      </div>
    </div>
  )
  // return (
  //   <div className="flex relative flex-1 flex-col gap-4">
  //     <div className="h-[54px] w-full flex">
  //       <div className=" mx-auto max-w-[34rem] px-6 w-full flex justify-between items-end">
  //         <span className="text-[22px] h-full font-medium relative flex items-end">
  //           Activate License
  //         </span>
  //       </div>
  //     </div>
  //     <div className="flex flex-col gap-2 max-w-[34rem] w-full px-6 mx-auto z-10 flex-1 pb-12">
  //       <div className="flex text-zinc-300 text-sm leading-[1.4] flex-col mb-4 gap-2">
  //         <p>
  //           You can purchase a license key for our official website{' '}
  //           <span className="text-primary underline cursor-pointer hover:brightness-125">
  //             snicod.pro
  //           </span>
  //           , then copy the license key below and click activate to start using snicod
  //         </p>
  //         <p>
  //           You will need to have an internet connection the first time you open it to activate your
  //           license. Contact our support team if you run into any problem
  //         </p>
  //       </div>
  //       <div className="flex flex-col gap-1 mb-1">
  //         <label htmlFor="" className="text-zinc-500 text-xs uppercase">
  //           License Key
  //         </label>
  //         <Input
  //           autoFocus
  //           onClear={() => setInputValue('')}
  //           value={inputValue}
  //           className="h-[32px]"
  //           onChange={(e) => setInputValue(e.target.value)}
  //         />
  //       </div>
  //       {error && (
  //         <p className="flex gap-2 items-center bg-red-700/25 text-red-300 text-sm rounded-md px-2.5 py-1.5">
  //           <BsExclamationTriangle className="size-4" /> <span>{error}</span>
  //         </p>
  //       )}
  //       <Button
  //         onClick={handleActivate}
  //         disabled={isLoading}
  //         className="bg-primary h-[32px] duration-200 transition-all hover:bg-primary/90 mt-auto"
  //       >
  //         {isLoading && <Loader className="size-4 animate-spin" />}
  //         <span>Activate</span>
  //       </Button>
  //     </div>
  //     <img
  //       src={logoIcon}
  //       alt="icon"
  //       className=" h-[100%] mb-2 opacity-[0.01] absolute inset-y-0 right-0 undragable"
  //     />
  //   </div>
  // )
}
export default LicensePage
