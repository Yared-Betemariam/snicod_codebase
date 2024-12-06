import { useModals } from '@renderer/store'
import { useLicenseKey } from '@renderer/store/license'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { Hint } from '../ui/tooltip'

const Plan = () => {
  const isActivated = useLicenseKey((state) => state.isActivated)
  const setShowSettingsModal = useModals((state) => state.setShowSettingsModal)

  const handleClick = () => {
    setShowSettingsModal(true, true)
  }

  return (
    <Hint hint="Plan">
      <div
        onClick={handleClick}
        className="text-sm opacity-75 uppercase border-0 border-color px-3.5 text-neutral-500 flex gap-1 items-center font-light hover:opacity-80 duration-200 transition-all cursor-pointer border-l border-color"
      >
        {isActivated ? <span>Pro</span> : <span>Trial</span>}
        <IoInformationCircleOutline className="inline size-4 " />
      </div>
    </Hint>
  )
}

export default Plan
