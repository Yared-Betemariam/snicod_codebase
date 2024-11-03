import { electronAPI } from '@electron-toolkit/preload'
import { GetLicenseKey, SetLicenseKey } from '@shared/index'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('frame', {
    closeWindow: () => ipcRenderer.invoke('window:close'),
    minimizeWindow: () => ipcRenderer.invoke('window:minimize')
  })
  contextBridge.exposeInMainWorld('app', {
    openHelpWindow: () => ipcRenderer.invoke('app:help'),
    setLicenseKey: (...args: Parameters<SetLicenseKey>) =>
      ipcRenderer.invoke('license:set', ...args),
    getLicenseKey: (...args: Parameters<GetLicenseKey>) =>
      ipcRenderer.invoke('license:get', ...args)
  })
} catch (error) {
  console.error(error)
}
