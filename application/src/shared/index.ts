export type Snippet = {
  id: string
  type: 'folder' | 'file'
  title: string
  children?: Snippet[]
  codeId?: string
  lang: string
  code?: Code
}

export type Code = {
  id: string
  code: string
}

export type Theme = 'dark' | 'light'

export type LicenseData = {
  key: string
  instance_id: string
}

export type Trial = {
  startDate: Date
  endDate: Date
}

export type AppData = {
  snippets: Snippet[]
  codes: Code[]
}

export type SettingsData = {
  sidebarOpen?: boolean
  sidebarWidth?: number
  fontSize?: number
}

export type SetLicenseKey = (key: string, instance_id: string) => void
export type GetLicenseKey = () => LicenseData | undefined
export type StartFreeTrial = () => Trial
export type CheckFreeTrial = () => Trial | undefined
export type ExportAppData = (data: AppData) => Promise<boolean>
export type ImportAppData = () => Promise<string>
export type GetSettingsData = () => SettingsData | undefined
export type SetSettingsData = (settingsData: SettingsData) => void

export const isMac = false
