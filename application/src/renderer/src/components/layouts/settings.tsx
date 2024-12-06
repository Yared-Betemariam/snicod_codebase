import { useModals } from '@renderer/store'
import { VscSettings } from 'react-icons/vsc'
import { ModalWrapper } from '../ui/ModelWrapper'
import { Hint } from '../ui/tooltip'
import SettingsPage from './settings-page'

const SettingsModal = () => {
  const { open, setOpen, license } = useModals((state) => ({
    open: state.showSettingsModal,
    setOpen: state.setShowSettingsModal,
    license: state.license
  }))

  return (
    <ModalWrapper
      open={open}
      onOpen={(value) => setOpen(value)}
      noHeader
      headerLabel="Settings"
      className="max-h-[80vh] h-full w-full max-w-[55vw] p-0"
      trigger={
        <Hint hint="Settings,Ctrl+S">
          <span className="h-full grid place-content-center hover:bg-neutral-300/40 dark:hover:bg-neutral-700/50 w-12">
            <VscSettings className="size-[21px] text-neutral-500 dark:text-neutral-400 rotate-90" />
          </span>
        </Hint>
      }
    >
      <SettingsPage tab={license ? 'l' : 'g'} />
    </ModalWrapper>
  )
}
export default SettingsModal
