import fileIcon from '@/assets/snippet.svg'
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
    <>
      <div className="flex flex-col pb-24 flex-1 max-h-[calc(100vh-40px-46px-28px-10px-10px)] overflow-auto w-full">
        {snippets && snippets.length > 0 ? (
          sortSnippets(filteredSnippets(snippets)).map((snippet, index) => (
            <Snippet expanded={expanded} onExpand={onExpand} key={index} snippet={snippet} />
          ))
        ) : snippets !== undefined ? (
          <div className="flex flex-col items-center justify-center px-3 py-3 gap-2 h-full">
            {/* <Ghost className="size-28 text-zinc-700/25" /> */}
            {/* <div className="relative w-16 rounded-md h-10 border border-color bg-zinc-700/25 mb-4 grid place-content-center">
              <span className="opacity-10 font-semibold">NONE</span> */}
            <img
              src={fileIcon}
              alt="icon"
              width={28}
              // className="absolute -bottom-[7px] -right-[7px]"
            />
            {/* </div> */}
            <span className="font-medium">You have no snippets.</span>
            <p className="text-sm text-zinc-500/50 max-w-[20ch]">
              Create a snippet/folder to get stared using this app.
            </p>
          </div>
        ) : (
          <Loader className="size-5 animate-spin my-auto mx-auto text-zinc-600" />
        )}
        {snippets && snippets.length > 0 && filteredSnippets(snippets).length <= 0 && (
          <p className="text-sm text-zinc-600 px-4 py-1">No matching results.</p>
        )}
      </div>
      <DeleteSnippet />
    </>
  )
}
export default SnippetsList
