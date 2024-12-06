import logoIcon from '@/assets/white-icon.png'
import { LanguageDropdown } from '@renderer/components/app/language-dropdown'
import CustomMonacoEditor from '@renderer/components/app/monaco-editor'
import NewSnippetModal from '@renderer/components/app/new-snippet'
import { updateSnippet } from '@renderer/db'
import { useSidebar, useSnippet, useSnippets } from '@renderer/store'
import { cn } from '@renderer/utils'
import { Snippet } from '@shared/index'
import { useEffect, useState } from 'react'
import { HiMiniCodeBracket } from 'react-icons/hi2'
import { RxCheck, RxCopy } from 'react-icons/rx'

const MainPage = () => {
  const { snippet, setSnippet } = useSnippet((state) => state)
  const { loadSnippets, snippets } = useSnippets()
  const [copied, setCopied] = useState(false)
  const { sidebarOpen, sidebarWidth } = useSidebar((state) => ({
    sidebarOpen: state.sidebarOpen,
    sidebarWidth: state.sidebarWidth
  }))

  const [contentWidth, setContentWidth] = useState(
    sidebarOpen ? document.body.clientWidth - sidebarWidth : document.body.clientWidth
  )

  useEffect(() => {
    const handleResize = () => {
      console.log(sidebarOpen, sidebarWidth)
      setContentWidth(
        sidebarOpen ? document.body.clientWidth - sidebarWidth : document.body.clientWidth
      )
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [sidebarOpen, sidebarWidth])

  const onClick = () => {
    if (snippet?.code) {
      navigator.clipboard.writeText(snippet.code.code)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1500)
    }
  }

  const updateLang = (newValue: string) => {
    if (snippet?.id) {
      const newSnippet: Snippet = {
        ...snippet,
        lang: newValue
      }
      updateSnippet(snippet.id, snippets!, newSnippet)
      setSnippet(newSnippet)
      loadSnippets()
    }
  }

  useEffect(() => {
    console.log(document.body.clientWidth)
  }, [document.body.clientWidth])

  return (
    <div
      style={{
        width: contentWidth
      }}
      className="flex-1 relative flex flex-col border-l border-color bg-[#fefefe] dark:bg-[#1d1d1d]"
    >
      {!sidebarOpen && <NewSnippetModal left />}
      <div className="min-h-[54px] w-full flex justify-between border-b border-neutral-200/75 dark:border-neutral-700/50 mb-2">
        <div className="flex gap-5 px-5 w-full">
          <div className="flex items-center w-full gap-4 relative">
            <HiMiniCodeBracket className="min-w-5 min-h-5 text-primary brightness-90 dark:brightness-100" />
            <div className="flex flex-col max-w-full">
              <p className="font-normal text-neutral-700/50 dark:text-neutral-400/50 text-xs uppercase">
                snippet
              </p>
              <p className="text-[15px] my-auto truncate w-full">
                {snippet ? snippet.title : '--'}
              </p>
            </div>
            <span className="border-neutral-200/75 dark:border-neutral-700/50 border-t rounded-full absolute w-44 top-0" />
          </div>
        </div>
        <div className="flex">
          <LanguageDropdown value={snippet?.lang} setValue={(newValue) => updateLang(newValue)} />
          <span
            onClick={onClick}
            className={cn(
              'h-full duration-100 transition-all flex items-center justify-center w-14 gap-2',
              copied || !snippet?.code
                ? 'opacity-40'
                : 'hover:opacity-80 cursor-pointer hover:bg-neutral-400/20 dark:hover:bg-neutral-950/25'
            )}
          >
            {copied ? (
              <RxCheck className="size-6 transition-all duration-100" />
            ) : (
              <RxCopy className="size-5 transition-all duration-100" />
            )}
          </span>
        </div>
      </div>
      {snippet?.code ? (
        <CustomMonacoEditor />
      ) : (
        <>
          <div className=" h-full w-full flex flex-col  items-center justify-center z-10">
            <img src={logoIcon} alt="icon" className=" w-44 mb-2 opacity-[0.02] undragable" />
          </div>
        </>
      )}
    </div>
  )
}
export default MainPage
