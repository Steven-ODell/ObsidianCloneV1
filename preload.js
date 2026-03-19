const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    saveFile: (content) => ipcRenderer.invoke('save-file', content)
})