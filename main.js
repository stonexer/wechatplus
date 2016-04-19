'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'wehchat+',
    width: 800,
    height: 600,
    resizable: false,
    center: true,
    show: true,
    frame: true,
    autoHideMenuBar: true,
    icon: 'assets/logo.png',
    titleBarStyle: 'hidden-inset',
    'webPreferences': {
      javascript: true,
      plugins: true,
      nodeIntegration: false,
      webSecurity: false,
    }
  })

  mainWindow.loadURL('file://' + __dirname + '/web/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
