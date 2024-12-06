import { electronApp, is, optimizer } from '@electron-toolkit/utils'
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
import { app, BrowserWindow, ipcMain, nativeTheme, shell } from 'electron'
import electronStore from 'electron-store'
import path, { join } from 'path'
import {
  exportAppDataFunc,
  handleGetSettingsData,
  handleSetSettingsData,
  importAppDataFunc
} from './data'
import { checkFreeTrial, handleGetLicenseKey, handleSetLicenseKey, startFreeTrial } from './license'

const icon = path.join(__dirname, '..', '..', './build/icon.png')
const isMac = false

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    title: 'Snicod',
    maxWidth: 860 + 240,
    maxHeight: 500,
    minWidth: 680,
    minHeight: 400,
    height: 460,
    width: 760 + 240,
    maximizable: false,
    ...(isMac ? { resizable: false } : {}),
    show: false,
    autoHideMenuBar: true,
    icon,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: {
      x: 15,
      y: 15
    },
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.setMenu(null)

  // frame operations
  if (!ipcMain.eventNames().includes('window:minimize')) {
    ipcMain.handle('window:minimize', () => {
      const window = BrowserWindow.getFocusedWindow()
      if (window) window.minimize()
    })
  }

  if (!ipcMain.eventNames().includes('window:close')) {
    ipcMain.handle('window:close', () => {
      app.quit()
    })
  }

  // links
  if (!ipcMain.eventNames().includes('app:help')) {
    ipcMain.handle('app:help', () => {
      shell.openExternal('https://snicod.pro/help')
    })
  }

  if (!ipcMain.eventNames().includes('app:website')) {
    ipcMain.handle('app:website', () => {
      shell.openExternal('https://snicod.pro')
    })
  }

  // theme manager
  const store = new electronStore()
  nativeTheme.themeSource = (store.get('theme') as Theme) || 'dark'

  if (!ipcMain.eventNames().includes('theme:toggle')) {
    ipcMain.handle('theme:toggle', (_, value: Theme) => {
      const store = new electronStore()
      nativeTheme.themeSource = value
      store.set('theme', value)
    })
  }

  if (!ipcMain.eventNames().includes('theme:current')) {
    ipcMain.handle('theme:current', () => {
      const store = new electronStore()
      return store.get('theme') as Theme
    })
  }

  mainWindow.webContents.openDevTools()

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  const appUserModelId = ''
  electronApp.setAppUserModelId(appUserModelId)

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  // license key
  ipcMain.handle('license:set', (_, ...args: Parameters<SetLicenseKey>) =>
    handleSetLicenseKey(...args)
  )

  ipcMain.handle('license:get', (_, ...args: Parameters<GetLicenseKey>) =>
    handleGetLicenseKey(...args)
  )

  // trial
  ipcMain.handle('trial:start', (_, ...args: Parameters<StartFreeTrial>) => startFreeTrial(...args))

  ipcMain.handle('trial:check', (_, ...args: Parameters<CheckFreeTrial>) => checkFreeTrial(...args))

  // app data
  ipcMain.handle('settings:get', (_, ...args: Parameters<GetSettingsData>) =>
    handleGetSettingsData(...args)
  )

  ipcMain.handle('settings:set', (_, ...args: Parameters<SetSettingsData>) =>
    handleSetSettingsData(...args)
  )

  // data
  ipcMain.handle('data:import', (_, ...args: Parameters<ImportAppData>) =>
    importAppDataFunc(...args)
  )
  ipcMain.handle('data:export', (_, ...args: Parameters<ExportAppData>) =>
    exportAppDataFunc(...args)
  )

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
