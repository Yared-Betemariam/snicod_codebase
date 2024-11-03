import { Code, Snippet } from '@shared/index'
import { DBSchema, openDB } from 'idb'
import { v4 as uuid } from 'uuid'

interface Database extends DBSchema {
  files: {
    key: string
    value: Snippet
    indexes: { 'by-id': string }
  }
  codes: {
    key: string
    value: Code
    indexes: { 'by-id': string }
  }
}

export async function initDB() {
  const db = await openDB<Database>('Database', 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('files')) {
        const fileStore = db.createObjectStore('files', { keyPath: 'id' })
        fileStore.createIndex('by-id', 'id')
      }

      if (!db.objectStoreNames.contains('codes')) {
        const objectStore = db.createObjectStore('codes', { keyPath: 'id' })
        objectStore.createIndex('by-id', 'id')
      }
    }
  })
  return db
}

export const addSnippetToDB = async (
  data: Snippet,
  files: Snippet[],
  parentId: string,
  lang: string
) => {
  const db = await initDB()

  let codeId: string | undefined
  if (data.type === 'file') {
    codeId = await addCodeToDB(lang)
    data = {
      ...data,
      codeId
    }
  }

  const tx = db.transaction('files', 'readwrite')
  const store = tx.objectStore('files')

  const addToParent = (snippets: Snippet[], parentId: string, newSnippet: Snippet): Snippet[] => {
    return snippets.map((snippet) => {
      if (snippet.id === parentId) {
        return {
          ...snippet,
          children: [...(snippet.children || []), newSnippet]
        }
      }

      if (snippet.children) {
        return {
          ...snippet,
          children: addToParent(snippet.children, parentId, newSnippet)
        }
      }

      return snippet
    })
  }

  if (parentId) {
    const updatedFiles = addToParent(files, parentId, data)

    for (let i = 0; i < updatedFiles.length; i++) {
      await store.put(updatedFiles[i])
    }
  } else {
    await store.add({ ...data, id: data.id })
  }

  await tx.done
}

export const getAllSnippetsFromDB = async () => {
  const db = await initDB()
  return db.getAll('files')
}

export const updateSnippet = async (id: string, snippets: Snippet[], newData: Snippet) => {
  const db = await initDB()
  const tx = db.transaction('files', 'readwrite')
  const store = tx.objectStore('files')

  const updateSnippetInChildren = (snippets: Snippet[]): Snippet[] => {
    return snippets.map((snippet) => {
      if (snippet.id === id) {
        return { ...snippet, ...newData }
      }

      if (snippet.children) {
        return {
          ...snippet,
          children: updateSnippetInChildren(snippet.children)
        }
      }

      return snippet
    })
  }

  const updatedSnippets = updateSnippetInChildren(snippets)

  for (let i = 0; i < updatedSnippets.length; i++) {
    await store.put(updatedSnippets[i])
  }

  await tx.done
}

export const deleteSnippetFromDb = async (files: Snippet[], id: string) => {
  const db = await initDB()
  const tx = db.transaction('files', 'readwrite')
  const store = tx.objectStore('files')

  await store.clear()

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.id !== id) {
      await store.put({
        ...file,
        ...(file.children ? { children: filterChildren(file.children, id) } : {})
      })
    }
    if (file.id === id && file.codeId && file.type == 'file') {
      deleteCodeFromDB(file.codeId)
    }
  }

  cleanUpOrphanedCodes()
  await tx.done
}

const filterChildren = (childrens: Snippet[], id) => {
  const filteredChildren: Snippet[] = []
  for (let i = 0; i < childrens.length; i++) {
    const child = childrens[i]
    if (child.id !== id) {
      filteredChildren.push({
        ...child,
        ...(child.children ? { children: filterChildren(child.children, id) } : {})
      })
    }
    if (child.id === id && child.codeId && child.type == 'file') {
      deleteCodeFromDB(child.codeId)
    }
  }
  return filteredChildren
}

// codes CURD
export const getCodeFromDB = async (id: string) => {
  const db = await initDB()
  const codes = await db.getAll('codes')
  console.log(codes)
  return db.get('codes', id)
}

export const addCodeToDB = async (lang: string): Promise<string> => {
  const db = await initDB()
  const codeTx = db.transaction('codes', 'readwrite')
  const codeStore = codeTx.objectStore('codes')

  const codeId = uuid()

  await codeStore.add({
    id: codeId,
    lang,
    code: 'シ Copy your code here.'
  })

  await codeTx.done

  return codeId
}

export const updateCodeInDB = async (id: string, updatedCode: string, lang: string) => {
  const db = await initDB()
  const codeTx = db.transaction('codes', 'readwrite')
  const codeStore = codeTx.objectStore('codes')

  const updatedCodeSnippet = {
    id,
    code: updatedCode,
    lang
  }

  await codeStore.put(updatedCodeSnippet)

  await codeTx.done
}

export const deleteCodeFromDB = async (id: string) => {
  const db = await initDB()
  const codeTx = db.transaction('codes', 'readwrite')
  const codeStore = codeTx.objectStore('codes')

  await codeStore.delete(id)

  await codeTx.done
}

export const cleanUpOrphanedCodes = async () => {
  const db = await initDB()

  // Get all snippets (including folders and files)
  const snippets = await db.getAll('files')

  // Get all codes (these are what might need cleanup)
  const codes = await db.getAll('codes')

  // Helper function to recursively collect code IDs from snippets and their children
  const collectCodeIdsFromSnippets = (snippets: Snippet[]): Set<string> => {
    const codeIds = new Set<string>()

    const collectCodeIds = (snippet: Snippet) => {
      // If the snippet is a 'file' and has an associated codeId, add it to the set
      if (snippet.type === 'file' && snippet.codeId) {
        codeIds.add(snippet.codeId)
      }

      // If the snippet has children, recursively collect their codeIds as well
      if (snippet.children && snippet.children.length > 0) {
        snippet.children.forEach(collectCodeIds)
      }
    }

    // Start collecting from all top-level snippets
    snippets.forEach(collectCodeIds)
    return codeIds
  }

  // Collect all code IDs that are referenced in the snippets (including nested children)
  const usedCodeIds = collectCodeIdsFromSnippets(snippets)

  // Create a transaction to work on the 'codes' store
  const codeTx = db.transaction('codes', 'readwrite')
  const codeStore = codeTx.objectStore('codes')

  // Iterate over all codes and delete any code that doesn't have a corresponding snippet
  for (const code of codes) {
    if (!usedCodeIds.has(code.id)) {
      await codeStore.delete(code.id)
    }
  }

  // Complete the transaction
  await codeTx.done
}
