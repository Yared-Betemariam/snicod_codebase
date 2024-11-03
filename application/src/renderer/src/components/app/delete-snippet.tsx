import { deleteSnippetFromDb } from '@renderer/db'
import { useModals, useSnippet, useSnippets } from '@renderer/store'
import { useState } from 'react'
import { ModalWrapper } from '../ui/ModelWrapper'
import Button from '../ui/button'
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
      className="p-3.5 max-w-[20rem]"
      noTrigger
      headerDesc={`Are you sure you want to permanently delete "${snippet.title}"?`}
      headerLabel={`Delete ${snippet.type}`}
      trigger={<></>}
    >
      <div className="flex w-full gap-4">
        <Button
          disabled={loading}
          className="flex-[2] h-8 bg-red-600 hover:bg-red-600/80"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <DialogClose asChild>
          <Button className=" h-8 flex-1">Cancel</Button>
        </DialogClose>
      </div>
    </ModalWrapper>
  )
}
export default DeleteSnippet
