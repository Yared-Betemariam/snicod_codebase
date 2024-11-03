import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { GetLicenseKey, SetLicenseKey } from '@shared/index'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import path, { join } from 'path'
import { handleGetLicenseKey, handleSetLicenseKey } from './license'

const icon = path.join(__dirname, '..', '..', './build/icon.png')
const isMac = false

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    title: 'Snicod',
    maxWidth: 860,
    maxHeight: 500,
    minWidth: 680,
    minHeight: 400,
    height: 460,
    width: 760,
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
  ipcMain.handle('window:minimize', () => {
    mainWindow.minimize()
  })

  ipcMain.handle('window:close', () => {
    app.quit()
  })

  ipcMain.handle('app:help', () => {
    shell.openExternal('https://snicod.pro/documentation')
  })

  // mainWindow.webContents.openDevTools()

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

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
