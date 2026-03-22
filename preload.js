const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    /* Sets up the tunnel for the system level functions.
    "save-file" is the name of the listener in Main.js */
    saveFile: (textAreaContent, selectedPath) => ipcRenderer.invoke('save-file', textAreaContent, selectedPath),
    readFile: (fileName, selectedPath) => ipcRenderer.invoke('read-file', fileName, selectedPath),
    createFolder: (currentPath, folderName) => ipcRenderer.invoke('create-folder', currentPath, folderName),
})