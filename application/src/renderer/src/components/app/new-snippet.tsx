import { addSnippetToDB } from '@renderer/db'
import { useAppSearch, useModals, useSnippets } from '@renderer/store'
import { cn } from '@renderer/utils'
import { Snippet } from '@shared/index'
import { useState, useTransition } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { v4 as uuid } from 'uuid'
import Button, { OutlinedButton } from '../ui/button'
import { DialogClose } from '../ui/dialog'
import { Dropdown } from '../ui/dropdown'
import Input from '../ui/input'
import { ModalWrapper } from '../ui/ModelWrapper'

import { BsTextLeft } from 'react-icons/bs'
type FileType = 'file' | 'folder'

import { BiCollection } from 'react-icons/bi'

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onCreate()
    }
  }

  const onCreate = () => {
    const snippet: Snippet = {
      id: uuid(),
      title,
      type: createFileType,
      lang: 'text'
    }
    startTransistion(() => {
      addSnippetToDB(snippet, useSnippets.getState().snippets!, parentId!).then(() => {
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
      headerLabel="Create"
      headerDesc="Create new snicod snippet or collection."
      open={showNewModal}
      onOpen={setShowNewModal}
      simple
      trigger={
        <span
          onClick={() => setSnippet(undefined)}
          className={cn(
            'size-14 grid place-content-center shadow-lg shadow-neutral-950/5 dark:shadow-neutral-950/5 rounded-full bottom-6 bg-[#e1e1e1] dark:bg-[#2a2a2a] border border-neutral-600/10 dark:border-neutral-300/10 z-50 absolute  hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer',
            left ? 'left-6' : 'right-6'
          )}
        >
          <BsPlusLg className="size-6" />
        </span>
      }
      className="w-full max-w-[32rem]"
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col gap-1 mb-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Title
            </span>
            <Input
              onKeyDown={handleKeyDown}
              maxLength={32}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClear={() => setTitle('')}
              placeholder="Your title here"
              autoFocus
              inputClassName="bg-neutral-200/50 dark:bg-neutral-900/50 rounded h-10 border-transparent"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Type</span>
            <Dropdown
              width={160}
              className="h-10"
              value={createFileType}
              setValue={(value) => setCreateFileType(value as FileType)}
              items={[
                { value: 'file', Icon: BsTextLeft, label: 'Snippet' },
                { value: 'folder', Icon: BiCollection, label: 'Collection' }
              ]}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <OutlinedButton>Cancel</OutlinedButton>
          </DialogClose>
          <Button
            onClick={onCreate}
            disabled={!title || isPending}
            className="bg-primary dark:bg-primary dark:hover:bg-primary/80 dark:brightness-90 hover:bg-primary/80 disabled:hover:bg-primary font-semibold justify-start"
          >
            <span>Create</span>
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
export default NewSnippetModal
