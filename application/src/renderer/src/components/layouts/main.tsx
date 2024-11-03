import logoIcon from '@/assets/white-icon.png'
import { LanguageDropdown } from '@renderer/components/app/language-dropdown'
import CustomMonacoEditor from '@renderer/components/app/monaco-editor'
import NewSnippetModal from '@renderer/components/app/new-snippet'
import { updateCodeInDB } from '@renderer/db'
import { useSidebar, useSnippet } from '@renderer/store'
import { cn, loadCodeFromDB } from '@renderer/utils'
import { useState } from 'react'
import { HiMiniCodeBracket } from 'react-icons/hi2'
import { RxCheck, RxCopy } from 'react-icons/rx'

const MainPage = () => {
  const { snippet, setSnippet } = useSnippet((state) => state)
  const [copied, setCopied] = useState(false)
  const { sidebarOpen, sidebarWidth } = useSidebar((state) => ({
    sidebarOpen: state.sidebarOpen,
    sidebarWidth: state.sidebarWidth
  }))

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
    if (snippet?.code) {
      updateCodeInDB(snippet.code.id, snippet.code.code, newValue)
      loadCodeFromDB(snippet.code.id).then((data) => {
        setSnippet(snippet, data)
      })
    }
  }

  return (
    <div
      style={{
        width: sidebarOpen ? document.body.clientWidth - sidebarWidth : document.body.clientWidth
      }}
      className="flex-1 relative flex flex-col border-t border-color border-l bg-[#1d1d1d]"
    >
      {!sidebarOpen && <NewSnippetModal left />}
      <div className="min-h-[54px] w-full flex justify-between border-b border-zinc-800/75 mb-2">
        <div className="flex gap-5 px-5 w-full">
          <div className="flex items-center w-full gap-4 relative">
            <HiMiniCodeBracket className="min-w-5 min-h-5 text-primary" />
            <div className="flex flex-col max-w-full">
              <p className="font-normal text-zinc-400/50 text-xs uppercase">snippet</p>
              <p className="text-[15px] my-auto truncate w-full">
                {snippet ? snippet.title : '--'}
              </p>
            </div>
            <span className="bg-primary/25 h-[1.4px] rounded-full absolute w-32 top-0" />
          </div>

          {/* {snippet && (
            <p className="text-zinc-400/50 text-base my-auto truncate">{snippet.title}</p>
          )} */}
        </div>
        <div className="flex">
          <LanguageDropdown
            value={snippet?.code?.lang}
            setValue={(newValue) => updateLang(newValue)}
          />
          <span
            onClick={onClick}
            className={cn(
              'h-full duration-100 transition-all flex items-center justify-center w-14 gap-2',
              copied || !snippet?.code
                ? 'opacity-40'
                : 'hover:opacity-80 cursor-pointer hover:bg-zinc-950/25'
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
