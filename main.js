const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 1030,
    minHeight: 1030,
    minWidth: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })

  win.loadURL('http://localhost:3000')

}

app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();


  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})