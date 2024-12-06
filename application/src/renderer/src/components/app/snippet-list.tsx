// import fileIcon from '@/assets/snippet.svg'
import { useSidebar, useSnippets } from '@renderer/store'
import { sortSnippets } from '@renderer/utils'
import { Loader } from 'lucide-react'
import DeleteSnippet from './delete-snippet'
import Snippet from './snippet'

const SnippetsList = ({
  expanded,
  onExpand
}: {
  expanded: Record<string, boolean>
  onExpand: (id: string) => void
}) => {
  const { snippets } = useSnippets()
  const { filteredSnippets } = useSidebar((state) => ({
    filteredSnippets: state.filterSnippets
  }))

  return (
    <div className="flex flex-col pr-1">
      <div className="flex flex-col flex-1 max-h-[calc(100vh-40px-46px-28px-10px-10px)] w-full scroll pb-16">
        {snippets && snippets.length > 0 ? (
          sortSnippets(filteredSnippets(snippets)).map((snippet, index) => (
            <Snippet expanded={expanded} onExpand={onExpand} key={index} snippet={snippet} />
          ))
        ) : snippets !== undefined ? (
          <p className="text-sm text-neutral-400 dark:text-neutral-600 px-4 py-1">No snippets</p>
        ) : (
          <Loader className="size-5 animate-spin my-auto mx-auto text-neutral-600" />
        )}
        {snippets && snippets.length > 0 && filteredSnippets(snippets).length <= 0 && (
          <p className="text-sm text-neutral-400 dark:text-neutral-600 px-4 py-1">
            No matching results.
          </p>
        )}
      </div>
      <DeleteSnippet />
    </div>
  )
}
export default SnippetsList
