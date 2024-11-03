export type Snippet = {
  id: string
  type: 'folder' | 'file'
  title: string
  children?: Snippet[]
  codeId?: string
  code?: Code
}

export type Code = {
  id: string
  lang: string
  code: string
}
export type SetLicenseKey = (key: string) => void
export type GetLicenseKey = () => string | undefined
