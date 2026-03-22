const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    /* Sets up the tunnel for the system level functions.
    "save-file" is the name of the listener in Main.js */
    saveFile: (textAreaContent) => ipcRenderer.invoke('save-file', textAreaContent),
    readFile: (fileName) => ipcRenderer.invoke('read-file', fileName),
    createFolder: (currentPath, folderName) => ipcRenderer.invoke('create-folder', currentPath, folderName),
})