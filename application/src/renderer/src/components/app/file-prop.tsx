import { useModals } from '@renderer/store'
import { Snippet } from '@shared/index'
import { TfiMore } from 'react-icons/tfi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

const FileProp = ({
  snippet,
  setRenameEnabled,
  open,
  setOpen
}: {
  snippet: Snippet
  setRenameEnabled: (value: boolean) => void
  open: boolean
  setOpen: (value: boolean) => void
}) => {
  const { setSnippet, setShowDeleteModal, setShowNewModal } = useModals((state) => ({
    setShowDeleteModal: state.setShowDeleteModal,
    setSnippet: state.setSnippet,
    setShowNewModal: state.setShowNewModal
  }))

  const handleDelete = () => {
    setSnippet(snippet)
    setShowDeleteModal(true)
  }

  const handleCreate = () => {
    setSnippet(snippet)
    setShowNewModal(true)
  }

  const handleRename = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setRenameEnabled(true)
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="focus-visible:outline-none focus-visible:ring-[0px] focus-visible:ring-transparent opacity-0 group-hover/snippet:opacity-80 hover:opacity-100 my-auto hover:bg-zinc-700/50 px-1.5 py-1 rounded-md">
        <TfiMore className="min-h-4 min-w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={2}
        onClick={(e) => e.stopPropagation()}
        align="end"
        className="w-52 bg-zinc-900 border border-zinc-600/25 shadow-lg rounded-none shadow-zinc-950/25 p-0 mx-2 py-1"
      >
        <DropdownMenuGroup className="p-0">
          <DropdownMenuItem
            disabled={snippet.type === 'file'}
            onClick={handleCreate}
            className="hover:bg-primary flex justify-between rounded-none m-0 space-x-2 py-[5px] px-4"
          >
            {/* <Plus size={14} /> */}
            <span>New</span>
            {/* <DropdownMenuShortcut className=" tracking-normal">CTRL+N</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-700/25 h-[1px]" />
          <DropdownMenuItem
            onClick={handleRename}
            className="hover:bg-primary flex justify-between  rounded-none space-x-2 py-[5px] px-4"
          >
            {/* <Edit size={14} /> */}
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="hover:bg-red-600/75 flex justify-between rounded-none  space-x-2 py-[5px] px-4"
          >
            {/* <Edit size={14} /> */}
            <span>Delete</span>
            {/* <DropdownMenuShortcut className=" tracking-normal">CTRL+D</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default FileProp
