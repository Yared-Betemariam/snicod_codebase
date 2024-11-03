import folderIcon from '@/assets/folder.svg'
import fileIcon from '@/assets/snippet.svg'
import { updateSnippet } from '@renderer/db'
import { useSidebar, useSnippet, useSnippets } from '@renderer/store'
import { cn, loadCodeFromDB, sortSnippets } from '@renderer/utils'
import { Snippet as SnippetType } from '@shared/index'
import { useEffect, useState } from 'react'
import { RiArrowDropRightFill } from 'react-icons/ri'
import FileProp from './file-prop'

const Snippet = ({
  snippet,
  expanded,
  onExpand,
  level
}: {
  snippet: SnippetType
  expanded: Record<string, boolean>
  onExpand: (id: string) => void
  level?: number
}) => {
  const { setSnippet, snippet: currentSnippet } = useSnippet()
  const isFiltering = useSidebar((state) => state.isFiltering)
  const [renameEnabled, setRenameEnabled] = useState(false)
  const [renameInput, setRenameInput] = useState(snippet.title)
  const [contextOpen, setContextOpen] = useState(false)

  const handleClick = () => {
    if (snippet.type == 'folder') {
      onExpand(snippet.id)
    } else {
      loadCodeFromDB(snippet.codeId).then((data) => {
        setSnippet(snippet, data)
      })
    }
  }

  const handleOnContextMenu = () => {
    setContextOpen(true)
  }

  useEffect(() => {
    const handleRenameDeactivation = () => {
      if (renameEnabled == true) {
        if (renameInput !== snippet.title) {
          renameSnippet()
        }
        setRenameEnabled(false)
      }
    }
    document.body.addEventListener('click', handleRenameDeactivation)
    return () => {
      document.body.removeEventListener('click', handleRenameDeactivation)
    }
  }, [renameEnabled, renameInput, snippet.title])

  const handleRename = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      renameSnippet()
    }
  }

  const renameSnippet = async () => {
    await updateSnippet(snippet.id, useSnippets.getState().snippets!, {
      ...snippet,
      title: renameInput
    })
    useSnippets.getState().loadSnippets()
    setRenameEnabled(false)
  }

  return (
    <>
      <div
        onContextMenu={handleOnContextMenu}
        onClick={handleClick}
        style={{
          paddingLeft: level ? 20 + level * 12 : 20
        }}
        className={cn(
          'flex relative group/snippet items-center gap-[2px] w-full hover:bg-zinc-700/25  pr-2',
          currentSnippet && currentSnippet.id == snippet.id && 'bg-primary/25'
        )}
      >
        {currentSnippet && currentSnippet.id == snippet.id && (
          <span className="border-r-[3px] border-primary/75 h-full absolute inset-y-0 left-0" />
        )}
        {level &&
          Array.from({ length: level }).map((_, level) => (
            <ParentLine level={level} key={`${snippet.title}${level}`} />
          ))}
        {snippet.type == 'folder' ? (
          <RiArrowDropRightFill
            style={{
              left: level ? 2 + level * 12 : 2
            }}
            className={cn(
              'size-6 absolute duration-[100ms] transition-all opacity-35',
              expanded[snippet.id] && 'rotate-90'
            )}
          />
        ) : (
          <></>
        )}
        <div className="flex h-[30px] w-full flex-1 pl-2 gap-2">
          {snippet.type == 'folder' && <img src={folderIcon} alt="icon" width={12} />}
          {snippet.type == 'file' && <img src={fileIcon} alt="icon" width={14} />}
          {!renameEnabled && (
            <span className="truncate flex-1 max-w-full text-[13px] text-zinc-300 mr-auto my-auto">
              {snippet.title}
            </span>
          )}
          {renameEnabled && (
            <div className="flex-1">
              <input
                maxLength={32}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                onKeyDown={handleRename}
                value={renameInput}
                onChange={(e) => setRenameInput(e.target.value)}
                className={`bg-zinc-900/25 py-0.5 w-full text-[13px] outline-none px-2 border border-color rounded h-full focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary`}
              />
            </div>
          )}
          <FileProp
            open={contextOpen}
            setOpen={(value) => setContextOpen(value)}
            setRenameEnabled={setRenameEnabled}
            snippet={snippet}
          />
        </div>
      </div>
      {snippet.type == 'folder' && (expanded[snippet.id] || isFiltering) && (
        <div className="flex flex-col">
          {snippet.children && snippet.children.length > 0 ? (
            sortSnippets(snippet.children).map((snippetItem, index) => (
              <Snippet
                key={index}
                snippet={snippetItem}
                onExpand={onExpand}
                expanded={expanded}
                level={level ? level + 1 : 1}
              />
            ))
          ) : (
            <span
              style={{
                paddingLeft: level ? 28 + level * 12 : 28
              }}
              className="text-sm text-zinc-600/75 relative truncate"
            >
              {Array.from({ length: level ? level + 1 : 1 }).map((_, level) => (
                <ParentLine level={level} key={`${snippet.title}${level}`} />
              ))}
              This folder is empty
            </span>
          )}
        </div>
      )}
    </>
  )
}

const ParentLine = ({ level }: { level: number }) => {
  return (
    <div
      style={{
        left: level + 1 > 1 ? 2 + level * 12 : 2
      }}
      className="size-6 flex absolute h-full"
    >
      <span className=" w-[.75px] h-full bg-zinc-600/50 mx-auto" />
    </div>
  )
}
export default Snippet
