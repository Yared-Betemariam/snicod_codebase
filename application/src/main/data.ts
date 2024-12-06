import {
  ExportAppData,
  GetSettingsData,
  ImportAppData,
  SetSettingsData,
  SettingsData
} from '@shared/index'
import { dialog } from 'electron'
import electronStore from 'electron-store'
import { readFile, writeFile } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir()}\\Documents`
}

export const exportAppDataFunc: ExportAppData = async (data) => {
  const rootDir = getRootDir()

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'Save App Data',
    defaultPath: `${rootDir}\\app-data.json`,
    buttonLabel: 'Save',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Json', extensions: ['json'] }]
  })

  if (canceled) {
    return false
  }

  await writeFile(filePath, JSON.stringify(data))
  return true
}

export const importAppDataFunc: ImportAppData = async () => {
  const rootDir = getRootDir()

  const { filePaths, canceled } = await dialog.showOpenDialog({
    title: 'Choose Data File',
    defaultPath: `${rootDir}`,
    buttonLabel: 'Open',
    filters: [{ name: 'Json', extensions: ['json'] }],
    properties: ['openFile']
  })

  if (canceled || filePaths.length === 0) {
    return ''
  }

  const data = await readFile(filePaths[0], { encoding: 'utf8' })
  return data
}

// app data
export const handleSetSettingsData: SetSettingsData = (settingsData) => {
  try {
    const store = new electronStore()
    store.set('settingsData', settingsData)
  } catch (error) {
    console.log(error)
  }
  return
}

export const handleGetSettingsData: GetSettingsData = () => {
  try {
    const store = new electronStore()
    const data = store.get('settingsData')
    return data as SettingsData
  } catch (error) {
    console.log(error)
  }
  return undefined
}
