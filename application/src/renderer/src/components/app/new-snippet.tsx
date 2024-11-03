import folderIcon from '@/assets/folder.svg'
import fileIcon from '@/assets/snippet.svg'
import { addSnippetToDB } from '@renderer/db'
import { useAppSearch, useModals, useSnippets } from '@renderer/store'
import { cn } from '@renderer/utils'
import { Snippet } from '@shared/index'
import { useState, useTransition } from 'react'
import { IconType } from 'react-icons'
import { BsPlusLg } from 'react-icons/bs'
import { IoFolderOutline } from 'react-icons/io5'
import { PiCodeLight } from 'react-icons/pi'
import { v4 as uuid } from 'uuid'
import Button from '../ui/button'
import { DialogClose } from '../ui/dialog'
import Input from '../ui/input'
import { ModalWrapper } from '../ui/ModelWrapper'

type FileType = 'file' | 'folder'

const NewSnippetModal = ({ left }: { left?: boolean }) => {
  const [createFileType, setCreateFileType] = useState<FileType>('file')
  const { expanded, setExpanded } = useAppSearch()
  const {
    showNewModal,
    setShowNewModal,
    setSnippet,
    id: parentId
  } = useModals((state) => ({
    showNewModal: state.showNewModal,
    setShowNewModal: state.setShowNewModal,
    id: state.snippet?.id,
    setSnippet: state.setSnippet
  }))

  const [title, setTitle] = useState('')
  const [isPending, startTransistion] = useTransition()

  const createFileTypeList: {
    type: FileType
    Icon: IconType
    img: string
  }[] = [
    {
      type: 'file',
      Icon: PiCodeLight,
      img: fileIcon
    },
    {
      type: 'folder',
      Icon: IoFolderOutline,
      img: folderIcon
    }
  ]

  const onCreate = () => {
    const snippet: Snippet = {
      id: uuid(),
      title,
      type: createFileType
    }
    startTransistion(() => {
      addSnippetToDB(snippet, useSnippets.getState().snippets!, parentId!, 'text').then(() => {
        if (parentId) {
          setExpanded({
            ...expanded,
            [parentId]: !expanded[parentId]
          })
        }
        useSnippets.getState().loadSnippets()
        setTitle('')
        setShowNewModal(false)
      })
    })
  }

  return (
    <ModalWrapper
      headerLabel="CREATE"
      // headerDesc="Create a snicod snippet/folder"
      open={showNewModal}
      onOpen={setShowNewModal}
      trigger={
        <span
          onClick={() => setSnippet(undefined)}
          className={cn(
            'size-14 grid place-content-center shadow-lg shadow-zinc-950/25 rounded-full bottom-6 bg-[#2a2a2a] border border-zinc-300/10 z-50 absolute  hover:bg-zinc-800 cursor-pointer',
            left ? 'left-6' : 'right-6'
          )}
        >
          <BsPlusLg className="size-6" />
        </span>
      }
      className="w-full p-6 max-w-[20rem] bg-[#212121]/0"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 mb-2">
          <span className="text-sm font-medium text-zinc-300">Snippet title</span>
          <Input
            maxLength={32}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClear={() => setTitle('')}
            autoFocus
            className="h-[2.25rem]"
          />
        </div>
        <div className="mb-3 flex w-full flex-col gap-2">
          <span className="text-sm text-zinc-300 font-medium">
            Choose{' '}
            <span className="text-[12px] leading-[1.2] max-w-[16rem] mb-1 text-zinc-500">
              Choose the type here
            </span>
          </span>

          <div className="flex flex-col rounded border border-zinc-600/50 bg-zinc-900/25">
            <span className="bg-zinc-700/25 rounded-t border-b border-color flex text-xs text-zinc-500 px-2 py-0.5">
              <span className="scale-[2.5] mr-2 text-zinc-300">&#183;</span> Select type
            </span>
            <div className="flex p-3 gap-3 justify-center">
              {createFileTypeList.map((FileType, index) => (
                <div
                  key={index}
                  onClick={() => setCreateFileType(FileType.type)}
                  className={cn(
                    'flex w-full border py-1.5 border-color items-center justify- gap-2 hover:opacity-100 opacity-75 cursor-pointer rounded px-2.5',
                    createFileType === FileType.type
                      ? 'ring-1 ring-primary/50 bg-primary/20 opacity-100'
                      : ''
                  )}
                >
                  {/* <FileType.Icon className="size-5 opacity-50" /> */}
                  <img src={FileType.img} alt="icon" width={14} />
                  <span className="capitalize text-sm font-medium">
                    {FileType.type == 'file' ? 'snippet' : 'collection'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            onClick={onCreate}
            disabled={!title || isPending}
            className="bg-primary/60 hover:bg-primary/40 disabled:hover:bg-primary/60 font-semibold h-8 px-3"
          >
            <span>Create</span>
          </Button>
          <DialogClose asChild>
            <Button className=" h-8 px-3">Cancel</Button>
          </DialogClose>
        </div>
      </div>
    </ModalWrapper>
  )
}
export default NewSnippetModal
