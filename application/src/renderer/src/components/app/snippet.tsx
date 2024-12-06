import folderOpenIcon from '@/assets/folder-open.svg'
import folderIcon from '@/assets/folder.svg'
import { updateSnippet } from '@renderer/db'
import { useSidebar, useSnippet, useSnippets } from '@renderer/store'
import { cn, languages, loadCodeFromDB, sortSnippets } from '@renderer/utils'
import { Snippet as SnippetType } from '@shared/index'
import { useEffect, useState } from 'react'
import { GoChevronRight } from 'react-icons/go'
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
          'flex relative group/snippet items-center gap-[2px] w-full hover:bg-neutral-300/25 dark:hover:bg-neutral-700/25  pr-2',
          currentSnippet &&
            currentSnippet.id == snippet.id &&
            'bg-neutral-400/10 dark:bg-neutral-700/20'
        )}
      >
        {level &&
          Array.from({ length: level }).map((_, level) => (
            <ParentLine level={level} key={`${snippet.title}${level}`} />
          ))}
        {snippet.type == 'folder' && (
          <GoChevronRight
            style={{
              left: level ? 5 + level * 12 : 5
            }}
            className={cn(
              'size-4 absolute duration-[100ms] transition-all opacity-35',
              expanded[snippet.id] && 'rotate-90'
            )}
          />
        )}
        <div className="flex h-[26px] w-full flex-1 pl-2 gap-1.5">
          <SnippetIcon snippet={snippet} expanded={expanded} isFiltering={isFiltering} />
          {!renameEnabled && (
            <span
              className={cn(
                'truncate flex-1 max-w-full text-[13px] text-neutral-800 dark:text-neutral-300 mr-auto my-auto font-normal',
                currentSnippet &&
                  currentSnippet.id == snippet.id &&
                  'text-neutral-900 dark:text-neutral-200'
              )}
            >
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
                className={`bg-neutral-900/25 py-0.5 w-full text-[13px] outline-none px-2 border border-color rounded h-full focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary`}
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
              className="text-sm text-neutral-400/75 dark:text-neutral-600/75 relative truncate"
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
      <span className=" w-[.75px] h-full bg-neutral-400/50 dark:bg-neutral-600/50 mx-auto" />
    </div>
  )
}

const SnippetIcon = ({
  snippet,
  expanded,
  isFiltering
}: {
  snippet: SnippetType
  expanded: Record<string, boolean>
  isFiltering: boolean
}) => {
  const getIconString = (type?: string) => {
    for (let i = 0; i < languages.length; i++) {
      const item = languages[i]
      if (item.value === type) {
        return item.svg
      }
    }
    return languages[0].svg
  }
  return (
    <>
      {snippet.type == 'folder' &&
        (expanded[snippet.id] || isFiltering ? (
          <img src={folderOpenIcon} alt="icon" width={17} />
        ) : (
          // <GoChevronDown className="size-[17px] my-auto text-neutral-400" />
          // <GoChevronRight className="size-[17px] my-auto text-neutral-400" />
          <img src={folderIcon} alt="icon" width={16} className="mr-[1px]" />
        ))}
      {snippet.type == 'file' && <img src={getIconString(snippet.lang)} alt="icon" width={16} />}
    </>
  )
}
export default Snippet
