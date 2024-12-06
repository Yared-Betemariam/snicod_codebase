import Editor from '@monaco-editor/react'
import { updateCodeInDB } from '@renderer/db'
import { useSettings, useSnippet } from '@renderer/store'
import { cn } from '@renderer/utils'
import { Loader } from 'lucide-react'
import { useEffect, useRef } from 'react'

const CustomMonacoEditor = () => {
  const editorRef = useRef(null)
  const { snippet, setSnippet } = useSnippet()
  const theme = useSettings((state) => state.theme)
  const fontSize = useSettings((state) => state.fontSize)

  function handleEditorDidMount(editor, _) {
    editorRef.current = editor
  }

  useEffect(() => {
    if (snippet?.code) {
      updateCodeInDB(snippet.code.id, snippet.code.code)
    }
  }, [snippet])

  return (
    <Editor
      loading={<Loader className="size-6 animate-spin text-neutral-400" />}
      className={cn('w-auto h-[calc(100vh-40px-54px-2px-16px)]')}
      value={snippet?.code?.code || ''}
      onChange={(e) => {
        if (snippet?.code) {
          setSnippet({ ...snippet, code: { ...snippet.code, code: e! } })
        }
      }}
      language={snippet?.lang}
      theme={theme == 'light' ? 'vs-light' : 'vs-dark'}
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
        fontSize,
        scrollBeyondLastLine: false,
        automaticLayout: true
      }}
    />
  )
}

export default CustomMonacoEditor
