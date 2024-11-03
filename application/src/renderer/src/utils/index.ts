import { getCodeFromDB } from '@renderer/db'
import { Snippet } from '@shared/index'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
