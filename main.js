const { app, BrowserWindow, ipcMain } = require('electron/main')

const path = require('path')
const {saveFile} = require('./file_management/fileSaver')
const {readFile} = require('./file_management/readFile')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
    })
    win.loadFile('main.html')
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    ipcMain.handle("save-file", (event, content) => {
        return saveFile(content)
    })
    ipcMain.handle("read-file", (event, content) => {
        return readFile(content)
    })
    createWindow()
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})