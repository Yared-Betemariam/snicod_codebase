import { getCodeFromDB } from '@renderer/db'
import { SettingsData, Snippet } from '@shared/index'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// icons
import codeIcon from '@/assets/svg/code.svg'
import cssIcon from '@/assets/svg/css.svg'
import htmlIcon from '@/assets/svg/html.svg'
import jsonIcon from '@/assets/svg/json.svg'
import markdownIcon from '@/assets/svg/markdown.svg'
import textIcon from '@/assets/svg/unknown.svg'
import { useSettings, useSidebar } from '@renderer/store'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const languages = [
  {
    value: 'text',
    label: 'Text',
    svg: textIcon
  },
  {
    value: 'javascript',
    label: 'JavaScript',
    svg: codeIcon
  },
  {
    value: 'typescript',
    label: 'TypeScript',
    svg: codeIcon
  },
  {
    value: 'python',
    label: 'Python',
    svg: codeIcon
  },
  {
    value: 'java',
    label: 'Java',
    svg: codeIcon
  },
  {
    value: 'cpp',
    label: 'C++',
    svg: codeIcon
  },
  {
    value: 'cs',
    label: 'C#',
    svg: codeIcon
  },
  {
    value: 'go',
    label: 'Go',
    svg: codeIcon
  },
  {
    value: 'php',
    label: 'PHP',
    svg: codeIcon
  },
  {
    value: 'ruby',
    label: 'Ruby',
    svg: codeIcon
  },
  {
    value: 'swift',
    label: 'Swift',
    svg: codeIcon
  },
  {
    value: 'kotlin',
    label: 'Kotlin',
    svg: codeIcon
  },
  {
    value: 'rust',
    label: 'Rust',
    svg: codeIcon
  },
  {
    value: 'r',
    label: 'R',
    svg: codeIcon
  },
  {
    value: 'perl',
    label: 'Perl',
    svg: codeIcon
  },
  {
    value: 'dart',
    label: 'Dart',
    svg: codeIcon
  },
  {
    value: 'bash',
    label: 'Bash',
    svg: codeIcon
  },
  {
    value: 'markdown',
    label: 'Markdown',
    svg: markdownIcon
  },
  {
    value: 'lua',
    label: 'Lua',
    svg: codeIcon
  },
  {
    value: 'shell',
    label: 'Shell',
    svg: codeIcon
  },
  {
    value: 'html',
    label: 'HTML',
    svg: htmlIcon
  },
  {
    value: 'css',
    label: 'CSS',
    svg: cssIcon
  },
  {
    value: 'sql',
    label: 'SQL',
    svg: codeIcon
  },
  {
    value: 'json',
    label: 'JSON',
    svg: jsonIcon
  },
  {
    value: 'xml',
    label: 'XML',
    svg: codeIcon
  },
  {
    value: 'yaml',
    label: 'YAML',
    svg: codeIcon
  }
]

export function sortSnippets(snippets: Snippet[]): Snippet[] {
  const folders = snippets.filter((snippet) => snippet.type === 'folder')
  const files = snippets.filter((snippet) => snippet.type === 'file')
  return [...folders, ...files]
}

export const filterSnippets = (
  snippets: Snippet[],
  criteria: {
    title?: string
  }
) => {
  const results: Snippet[] = []
  const { title } = criteria

  snippets.forEach((snippet) => {
    const editedSnippet = {
      ...snippet,
      children: snippet.children ? filterSnippets(snippet.children, criteria) : undefined
    }
    if (
      title &&
      (snippet.title.toLowerCase().includes(title.toLowerCase()) ||
        (editedSnippet.children && editedSnippet.children?.length > 0))
    ) {
      results.push(editedSnippet)
    }
  })

  return results
}

export const loadCodeFromDB = async (codeId?: string) => {
  try {
    if (codeId) {
      const data = await getCodeFromDB(codeId)
      return data
    }
    return undefined
  } catch (error) {
    return undefined
  }
}

export const updateSettingsData = async () => {
  const data = await window.app.getSettingsData()
  if (data) {
    useSidebar.getState().setSidebarOpen(data.sidebarOpen!)
    useSettings.getState().setFontSize(data.fontSize!)
    useSidebar.getState().setSidebarWidth(data.sidebarWidth!)
  }
}

export const updateDatabaseSettingsData = () => {
  const settingsData: SettingsData = {
    sidebarOpen: useSidebar.getState().sidebarOpen,
    sidebarWidth: useSidebar.getState().sidebarWidth,
    fontSize: useSettings.getState().fontSize
  }
  window.app.setSettingsData(settingsData)
}
