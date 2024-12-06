import { getAllSnippetsFromDB } from '@renderer/db'
import {
  filterSnippets as filterSnippetsByInput,
  updateDatabaseSettingsData
} from '@renderer/utils'
import { Code, Snippet, Theme } from '@shared/index'
import { create } from 'zustand'

// app settings
interface SettingsStore {
  fontSize: number
  setFontSize: (fontSize: number) => void
  theme: Theme | undefined
  loadTheme: () => Promise<void>
  setTheme: (theme: Theme) => void
}

export const useSettings = create<SettingsStore>((set) => ({
  fontSize: 14,
  setFontSize: (fontSize) => {
    set({ fontSize })
    updateDatabaseSettingsData()
  },
  theme: undefined,
  setTheme: (theme) => set({ theme }),
  loadTheme: async () => {
    const res = await window.app.getCurrentTheme()
    set({
      theme: res
    })
  }
}))

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
  showSearchPopover: boolean
  setShowSearchPopover: (value: boolean) => void
  showSettingsModal: boolean
  license?: boolean
  setShowSettingsModal: (value: boolean, license?: boolean) => void
}

export const useModals = create<ModalsStore>((set) => ({
  snippet: undefined,
  setSnippet: (snippet) => set({ snippet }),
  showDeleteModal: false,
  setShowDeleteModal: (value) => set({ showDeleteModal: value }),
  showNewModal: false,
  setShowNewModal: (value) => set({ showNewModal: value }),
  showSearchPopover: false,
  setShowSearchPopover: (value) => set({ showSearchPopover: value }),
  showSettingsModal: false,
  setShowSettingsModal: (value, license) => set({ showSettingsModal: value, license })
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
    updateDatabaseSettingsData()
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
    useSidebar.getState().setSidebarWidth(250)
    updateDatabaseSettingsData()
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
