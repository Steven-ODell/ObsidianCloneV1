const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    /* Sets up the tunnel for the system level functions.
    "save-file" is the name of the listener in Main.js */
    saveFile: (currentState) => ipcRenderer.invoke('save-file', currentState),
    readFile: (fileName, selectedPath) => ipcRenderer.invoke('read-file', fileName, selectedPath),
    createFolder: (currentPath, folderName) => ipcRenderer.invoke('create-folder', currentPath, folderName),
    getVaultTree: () => ipcRenderer.invoke('get-vault-tree'),    
    deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),

    createTreeOnStart: (callback) => ipcRenderer.on('vault-start-load-tree', callback), })
