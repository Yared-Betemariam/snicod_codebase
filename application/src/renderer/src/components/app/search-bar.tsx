import { PopoverClose } from '@radix-ui/react-popover'
import { useAppSearch, useModals, useSnippet, useSnippets } from '@renderer/store'
import { loadCodeFromDB } from '@renderer/utils'
import { Snippet } from '@shared/index'
import { useEffect, useState } from 'react'
import { IoIosCode, IoIosSearch } from 'react-icons/io'
import Input from '../ui/input'
import PopoverWrapper from '../ui/popover-wrapper'
import Shortcut from '../ui/shortcut'
import { Hint } from '../ui/tooltip'

type OperationItem = {
  title: string
  operationFunction: () => void
  shortcut: string
}

const SearchBar = () => {
  const { toggleSidebar } = useAppSearch()
  const [filterInput, setFilterInput] = useState('')
  const [filteredList, setFilteredList] = useState<Snippet[]>([])
  const snippets = useSnippets((state) => state.snippets)
  const { setSnippet } = useSnippet()
  const { showSearchPopover, setShowSearchPopover } = useModals((state) => ({
    showSearchPopover: state.showSearchPopover,
    setShowSearchPopover: state.setShowSearchPopover
  }))

  const normalOperationsList = [
    {
      title: 'Application: Toggle Sidebar',
      operationFunction: () => toggleSidebar(),
      shortcut: 'Ctrl+B'
    },
    {
      title: 'Help: Documentation',
      operationFunction: () => window.app.openHelpWindow(),
      shortcut: 'Ctrl+H'
    }
  ]
  const [operationsList, setOperationsList] = useState<OperationItem[]>(normalOperationsList)

  const filterSnippet = (snippets: Snippet[], title: string) => {
    let results: Snippet[] = []

    snippets.forEach((snippet) => {
      if (title && snippet.title.toLowerCase().includes(title) && snippet.type === 'file') {
        results.push(snippet)
      }
      if (snippet.children) {
        results = [...results, ...filterSnippet(snippet.children, title)]
      }
    })

    return results
  }

  const filterOperations = (operations: OperationItem[]) => {
    return operations.filter((operation) =>
      operation.title.toLowerCase().includes(filterInput.toLowerCase())
    )
  }

  useEffect(() => {
    if (filterInput) {
      setFilteredList(filterSnippet(snippets!, filterInput))
      setOperationsList(filterOperations(normalOperationsList))
    } else {
      setFilteredList([])
      setOperationsList(normalOperationsList)
    }
  }, [filterInput])

  const handleSnippetClick = (snippet: Snippet) => {
    loadCodeFromDB(snippet.codeId).then((data) => {
      setSnippet(snippet, data)
    })
  }
  return (
    <PopoverWrapper
      open={showSearchPopover}
      onOpen={(value) => setShowSearchPopover(value)}
      className="min-w-[36rem] p-0 pb-2 py-2.5 shadow-lg shadow-neutral-500/25 dark:shadow-neutral-950/25 space-y-2 mx-4"
      trigger={
        <Hint hint="Search,Ctrl+Tab">
          <span className="border-l-0 border-color  h-full flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-300/40 dark:hover:bg-neutral-700/50 w-12">
            <IoIosSearch className="size-[20px]" />
          </span>
        </Hint>
      }
    >
      <div className="flex flex-col px-3 border-b-0 border-color">
        <Input
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          inputClassName="ring-[2px] ring-primary rounded-[2px] border-transparent"
          placeholder="Search by name (snippets, folders and etc...)"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        {operationsList.length > 0 &&
          operationsList.map((operationItem, index) => (
            <PopoverClose
              onClick={operationItem.operationFunction}
              key={`${operationItem.title}${index}`}
              className="flex w-full gap-2 items-center hover:bg-primary px-4 py-1 text-[12px] rounded-none hover:text-neutral-100"
            >
              <span className="mr-auto">{operationItem.title}</span>
              <Shortcut text={operationItem.shortcut} titleKey={operationItem.title} />
            </PopoverClose>
          ))}
        {filterInput &&
          filteredList.length > 0 &&
          filteredList.map((item, index) => (
            <PopoverClose
              onClick={() => handleSnippetClick(item)}
              key={`${item.title}${index}`}
              className="flex w-full gap-2 group/item items-center hover:bg-primary/75 rounded-none px-3 py-1 text-[12px]"
            >
              <IoIosCode className="size-[17px] text-primary group-hover/item:text-neutral-100" />
              <span className="group-hover/item:text-neutral-100">{item.title}</span>
            </PopoverClose>
          ))}
        {filterInput && [...filteredList, ...operationsList].length <= 0 && (
          <PopoverClose
            key={'noresults'}
            disabled
            className="flex w-full gap-2 group/item items-center rounded px-4 py-0.5 text-[12px]"
          >
            <span className="text-neutral-400 dark:text-neutral-600">No matching result</span>
          </PopoverClose>
        )}
      </div>
    </PopoverWrapper>
  )
}
export default SearchBar
