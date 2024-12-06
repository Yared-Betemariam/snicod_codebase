import { electronAPI } from '@electron-toolkit/preload'
import {
  CheckFreeTrial,
  ExportAppData,
  GetLicenseKey,
  GetSettingsData,
  ImportAppData,
  SetLicenseKey,
  SetSettingsData,
  StartFreeTrial,
  Theme
} from '@shared/index'
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
    openAppWebsite: () => ipcRenderer.invoke('app:website'),
    getCurrentTheme: () => ipcRenderer.invoke('theme:current'),
    toggleDarkMode: (value: Theme) => ipcRenderer.invoke('theme:toggle', value),
    setLicenseKey: (...args: Parameters<SetLicenseKey>) =>
      ipcRenderer.invoke('license:set', ...args),
    getLicenseKey: (...args: Parameters<GetLicenseKey>) =>
      ipcRenderer.invoke('license:get', ...args),
    getSettingsData: (...args: Parameters<GetSettingsData>) =>
      ipcRenderer.invoke('settings:get', ...args),
    setSettingsData: (...args: Parameters<SetSettingsData>) =>
      ipcRenderer.invoke('settings:set', ...args),
    checkFreeTrial: (...args: Parameters<CheckFreeTrial>) =>
      ipcRenderer.invoke('trial:check', ...args),
    startFreeTrial: (...args: Parameters<StartFreeTrial>) =>
      ipcRenderer.invoke('trial:start', ...args),
    importAppData: (...args: Parameters<ImportAppData>) =>
      ipcRenderer.invoke('data:import', ...args),
    exportAppData: (...args: Parameters<ExportAppData>) =>
      ipcRenderer.invoke('data:export', ...args)
  })
} catch (error) {
  console.error(error)
}
