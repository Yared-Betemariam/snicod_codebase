import { getAllSnippetsFromDB } from '@renderer/db'
import { filterSnippets as filterSnippetsByInput } from '@renderer/utils'
import { Code, Snippet } from '@shared/index'
import { create } from 'zustand'

// snippet
interface SinppetStore {
  snippet: Snippet | undefined
  setSnippet: (snippet: Snippet | undefined, code?: Code) => void
}

export const useSnippet = create<SinppetStore>((set) => ({
  snippet: undefined,
  setSnippet: (snippet, code) => {
    if (snippet) {
      snippet = {
        ...snippet,
        ...(code && { code })
      }
      set({ snippet })
    } else {
      set({ snippet })
    }
  }
}))

// allfunctions
interface AppSearchStore {
  toggleSidebar: () => void
  expanded: Record<string, boolean>
  setExpanded: (expanded: Record<string, boolean>) => void
}

export const useAppSearch = create<AppSearchStore>((set) => ({
  toggleSidebar: () => {
    useSidebar.getState().setSidebarOpen(!useSidebar.getState().sidebarOpen)
  },
  expanded: {},
  setExpanded: (expanded) => set({ expanded })
}))

// modals
interface ModalsStore {
  snippet: Snippet | undefined
  setSnippet: (snippet: Snippet | undefined) => void
  showDeleteModal: boolean
  setShowDeleteModal: (value: boolean) => void
  showNewModal: boolean
  setShowNewModal: (value: boolean) => void
}

export const useModals = create<ModalsStore>((set) => ({
  snippet: undefined,
  setSnippet: (snippet) => set({ snippet }),
  showDeleteModal: false,
  setShowDeleteModal: (value) => set({ showDeleteModal: value }),
  showNewModal: false,
  setShowNewModal: (value) => set({ showNewModal: value })
}))

// sidebar
interface SidebarStore {
  sidebarWidth: number
  setSidebarWidth: (newWidth: number) => void
  sidebarOpen: boolean
  isFiltering: boolean
  setSidebarOpen: (sidebarOpen: boolean) => void
  filterInput: string
  setFilterInput: (value: string) => void
  filterSnippets: (snippets: Snippet[]) => Snippet[]
}

export const useSidebar = create<SidebarStore>((set, get) => ({
  sidebarWidth: 250,
  setSidebarWidth: (newWidth) => {
    set({ sidebarWidth: newWidth })
    localStorage.setItem('sidebarWidth', JSON.stringify(newWidth))
  },
  filterInput: '',
  isFiltering: false,
  sidebarOpen: true,
  setFilterInput: (value) => {
    set({ filterInput: value })
    set({ isFiltering: value ? true : false })
  },
  setSidebarOpen: (sidebarOpen) => {
    set({ sidebarOpen })
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen))
  },
  filterSnippets: (snippets) => {
    const filterInput = get().filterInput
    if (filterInput) {
      const filteredSnippets = filterSnippetsByInput(snippets, {
        title: filterInput
      })
      return filteredSnippets
    } else {
      return snippets
    }
  }
}))

// snippets system
interface SinppetsStore {
  snippets: Snippet[] | undefined
  setSnippets: (snippets: Snippet[]) => void
  loadSnippets: () => Promise<void>
}

export const useSnippets = create<SinppetsStore>((set) => ({
  snippets: undefined,
  setSnippets: (snippets) => {
    set({ snippets })
  },
  loadSnippets: async () => {
    try {
      const snippets = await getAllSnippetsFromDB()
      set({ snippets })
    } catch (error) {
      console.log(error)
    }
  }
}))
