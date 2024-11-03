import Editor from '@monaco-editor/react'
import { updateCodeInDB } from '@renderer/db'
import { useSidebar, useSnippet } from '@renderer/store'
import { cn } from '@renderer/utils'
import { Loader } from 'lucide-react'
import { useEffect, useRef } from 'react'

const CustomMonacoEditor = () => {
  const editorRef = useRef(null)
  const { snippet, setSnippet } = useSnippet()
  const { sidebarWidth, sidebarOpen } = useSidebar((state) => ({
    sidebarWidth: state.sidebarWidth,
    sidebarOpen: state.sidebarOpen
  }))

  function handleEditorDidMount(editor, _) {
    editorRef.current = editor
  }

  useEffect(() => {
    if (snippet?.code) {
      updateCodeInDB(snippet.code.id, snippet.code.code, snippet.code.lang)
    }
  }, [snippet])

  useEffect(() => {
    console.log(document.body.clientWidth)
  }, [document.body.clientWidth])

  return (
    <Editor
      loading={<Loader className="size-6 animate-spin text-zinc-400" />}
      className={cn('w-auto h-[calc(100vh-40px-54px-2px-16px)]')}
      // width={sidebarOpen ? document.body.clientWidth - sidebarWidth : document.body.clientWidth}
      value={snippet?.code?.code || ''}
      onChange={(e) => {
        if (snippet?.code) {
          setSnippet({ ...snippet, code: { ...snippet.code, code: e! } })
        }
      }}
      language={snippet?.code?.lang}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      options={{
        renderValidationDecorations: 'off',
        wordWrap: 'on',
        wordBasedSuggestions: 'off',
        suggest: {
          showWords: false,
          showKeywords: false,
          showSnippets: false,
          showFunctions: false,
          showVariables: false,
          showClasses: false,
          showModules: false,
          showProperties: false,
          showMethods: false,
          showConstructors: false,
          showEvents: false,
          showOperators: false,
          showUnits: false,
          showValues: false,
          showInterfaces: false,
          showEnumMembers: false,
          showColors: false,
          showFiles: false,
          showReferences: false,
          showIssues: false
        },
        minimap: { enabled: false },
        lineNumbers: 'on',
        fontSize: 14,
        scrollBeyondLastLine: false,
        automaticLayout: true
      }}
    />
  )
}

export default CustomMonacoEditor
