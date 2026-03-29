const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')

const fs = require('fs')
const path = require('path')
const { deleteFile } = require('./file_management/deleteCurrentFile.js')
const { buildTree } = require('./file_management/fileExplorerBuilder')
const { vaultPath } = require('./vaultConfig')
const { saveFile } = require('./file_management/fileSaver')
const { readFile } = require('./file_management/readFile')
const { getVaultTree } = require('./file_management/getVaultTree')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        // Initiate the preload when the window loads more details in preload
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('main.html')

    /* Load the files on start up and send the tree to be made into buttons */
    win.webContents.on('did-finish-load', () => {
        let vaultTree = buildTree(vaultPath, 0)
        win.webContents.send('vault-start-load-tree', vaultTree)
    })

    win.webContents.openDevTools()
}

app.whenReady().then(() => {

    /* IPCMain handles are basically event listeners for the IPC Tunnel
    when you set one up a handle allows the functions in that tunnel to
    processes what comes through the tunnel and sends it back through with return
    
    essentially handles are taking the function called that needs system access and uses the 
    ipc tunnel to understand the connection then allows browser to essentially directly 
    talk to the system via Main.js. When a function is called like save-file in 
    MainParserV3.js from a button it gets executed here. IPC preload was the tunnel to set
    that up so main can talk to the specific browser calls*/

    ipcMain.handle('delete-file', (event, filePath) => {
        let response = deleteFile(filePath)
        if (response === "trigger-popup") {
            dialog.showMessageBox({message: `A file at ${filePath} doesnt exist\nSilly ;)`})
        }
        return response
    })

    ipcMain.handle('get-vault-tree', (event, vaultTree) => {
        vaultTree = getVaultTree(vaultPath, 0)
        return vaultTree
    })

    ipcMain.handle("save-file", (event, currentState) => {
        const result = saveFile(currentState)
        if (result === "duplicate") {
            dialog.showMessageBox({ message: "A file with that title already exists." })
            return "duplicate"
        }
        return result
    })

    ipcMain.handle("read-file", (event, fileName, selectedPath) => {
        return readFile(fileName, selectedPath)
    })

    ipcMain.handle("create-folder", (event, currentPath, folderName) => {
        const fullPath = path.join(currentPath, folderName)
        // Create the folder
        fs.mkdirSync(fullPath)
        return fullPath
    })

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
