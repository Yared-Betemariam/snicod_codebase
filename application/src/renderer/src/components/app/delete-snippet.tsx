import { deleteSnippetFromDb } from '@renderer/db'
import { useModals, useSnippet, useSnippets } from '@renderer/store'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { ModalWrapper } from '../ui/ModelWrapper'
import Button, { OutlinedButton } from '../ui/button'
import { DialogClose } from '../ui/dialog'

const DeleteSnippet = () => {
  const { snippet, showDeleteModal, setShowDeleteModal } = useModals()
  const [loading, setLoading] = useState(false)
  if (!snippet) return

  const handleDelete = () => {
    setLoading(true)
    deleteSnippetFromDb(useSnippets.getState().snippets!, snippet.id)
      .then(() => {
        setShowDeleteModal(false)
        useSnippet.getState().setSnippet(undefined)
      })
      .finally(() => {
        setLoading(false)
        setShowDeleteModal(false)
        useSnippets.getState().loadSnippets()
      })
  }

  return (
    <ModalWrapper
      open={showDeleteModal}
      onOpen={setShowDeleteModal}
      className="max-w-[28rem]"
      noTrigger
      simple
      headerDesc={`Are you sure you want to permanently delete "${snippet.title}"?`}
      headerLabel={`Delete ${snippet.type}`}
      trigger={<></>}
    >
      {snippet.type == 'folder' && (
        <span className="text-sm">
          <AlertCircle className="size-[13px] inline mr-0.5 alert-color" /> Note that when deleting
          a folder all its children will be deleteded as well
        </span>
      )}
      <div className="flex w-full justify-end gap-3">
        <DialogClose asChild>
          <OutlinedButton className="h-8">Cancel</OutlinedButton>
        </DialogClose>
        <Button
          disabled={loading}
          className="h-8 bg-red-600 dark:bg-red-500 hover:bg-red-600/80 dark:hover:bg-red-500/80"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </ModalWrapper>
  )
}
export default DeleteSnippet
