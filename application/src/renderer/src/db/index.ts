import { AppData, Code, Snippet } from '@shared/index'
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

export const addSnippetToDB = async (data: Snippet, files: Snippet[], parentId: string) => {
  const db = await initDB()

  let codeId: string | undefined
  if (data.type === 'file') {
    codeId = await addCodeToDB()
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
  return db.get('codes', id)
}

export const addCodeToDB = async (): Promise<string> => {
  const db = await initDB()
  const codeTx = db.transaction('codes', 'readwrite')
  const codeStore = codeTx.objectStore('codes')

  const codeId = uuid()

  await codeStore.add({
    id: codeId,
    code: ''
  })

  await codeTx.done

  return codeId
}

export const updateCodeInDB = async (id: string, updatedCode: string) => {
  const db = await initDB()
  const codeTx = db.transaction('codes', 'readwrite')
  const codeStore = codeTx.objectStore('codes')

  const updatedCodeSnippet = {
    id,
    code: updatedCode
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
  const snippets = await db.getAll('files')
  const codes = await db.getAll('codes')

  const collectCodeIdsFromSnippets = (snippets: Snippet[]): Set<string> => {
    const codeIds = new Set<string>()

    const collectCodeIds = (snippet: Snippet) => {
      if (snippet.type === 'file' && snippet.codeId) {
        codeIds.add(snippet.codeId)
      }

      if (snippet.children && snippet.children.length > 0) {
        snippet.children.forEach(collectCodeIds)
      }
    }

    snippets.forEach(collectCodeIds)
    return codeIds
  }

  const usedCodeIds = collectCodeIdsFromSnippets(snippets)

  const codeTx = db.transaction('codes', 'readwrite')
  const codeStore = codeTx.objectStore('codes')

  for (const code of codes) {
    if (!usedCodeIds.has(code.id)) {
      await codeStore.delete(code.id)
    }
  }

  await codeTx.done
}

// import and export
export const getDatabaseData = async () => {
  const db = await initDB()
  const snippets = await db.getAll('files')
  const codes = await db.getAll('codes')
  return {
    snippets,
    codes
  } as AppData
}

export const setDatabaseData = async (data: string) => {
  const appData = JSON.parse(data) as AppData
  if (!appData.snippets || !appData.codes) {
    return false
  }

  const db = await initDB()

  const filesTx = db.transaction('files', 'readwrite')
  const filesStore = filesTx.objectStore('files')
  await filesStore.clear()
  await filesTx.done

  const codesTx = db.transaction('codes', 'readwrite')
  const codesStore = codesTx.objectStore('codes')
  await codesStore.clear()
  await codesTx.done

  const addFilesTx = db.transaction('files', 'readwrite')
  const filesAddStore = addFilesTx.objectStore('files')
  for (const snippet of appData.snippets) {
    await filesAddStore.add(snippet)
  }
  await addFilesTx.done

  const addCodesTx = db.transaction('codes', 'readwrite')
  const codesAddStore = addCodesTx.objectStore('codes')
  for (const code of appData.codes) {
    await codesAddStore.add(code)
  }
  await addCodesTx.done

  return true
}
