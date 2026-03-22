import { renderer } from "./parser/RendererV3.js";
import { createNewFileButton } from "./file_management/createFileButton.js";
import { blockParser } from "./parser/MainParserV3.js";
import { createFolderButton } from "./file_management/createFolderButton.js";
let selectedPath = '/Users/Steven/Desktop/Learning to Code 2026/JS/ElectronProjects/ObsidianCloneV1/TestVault'

const inputBox = document.getElementById("main-editor-text-area");
const outputDiv = document.getElementById("main-editor-div");
const previewButton = document.getElementById("toggle-preview");
const editorButton = document.getElementById("toggle-editor");
const feToolBarNewFileButton = document.getElementById("fe-new-file");
const feToolBarNewFolderButton = document.getElementById("fe-new-folder");
const sideToolBarNewFile = document.getElementById("tool-bar-new-file-button");
const fileExplorer = document.getElementById("file-explorer")

inputBox.addEventListener('input', () => {
    const rootReadyForRender = blockParser(inputBox.value)
    outputDiv.innerHTML = renderer(rootReadyForRender)
})

previewButton.addEventListener('click', () => {
    inputBox.style.backgroundColor = 'transparent';
    inputBox.style.color = 'transparent';
    inputBox.style.zIndex = 0;
})

editorButton.addEventListener('click', () => {
    inputBox.style.backgroundColor = 'rgb(19, 19, 19)';
    inputBox.style.color = 'rgb(238, 238, 238)';
    inputBox.style.zIndex = 2;
})

sideToolBarNewFile.addEventListener('click', async () => {
    const newFile = await window.api.saveFile(inputBox.value, selectedPath)
    if (!newFile) return
    if (newFile === "duplicate") {
        return
    }
    inputBox.value = ""
    fileExplorer.append(createNewFileButton(newFile, inputBox, selectedPath))
})

fileExplorer.addEventListener('click', () => {
    selectedPath = '/Users/Steven/Desktop/Learning to Code 2026/JS/ElectronProjects/ObsidianCloneV1/TestVault'
})

feToolBarNewFileButton.addEventListener('click', async () => {
    /* Sending the signal to the Main.js through the IPC tunnel to 
    process the call which needs system access which is why this window.api is needed*/
    const newFile = await window.api.saveFile(inputBox.value, selectedPath)
    if (!newFile) return
    if (newFile === "duplicate") {
        return
    }
    inputBox.value = ""
    fileExplorer.append(createNewFileButton(newFile, inputBox, selectedPath))
})

feToolBarNewFolderButton.addEventListener('click', async () => {
    const folderName = document.createElement('input')
    folderName.className = "tempFolderNameInput"
    fileExplorer.append(folderName)
    folderName.focus()
    folderName.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            if (folderName.value === "") { return }
            const fullPath = await window.api.createFolder(selectedPath, folderName.value)
            fileExplorer.append(createFolderButton(folderName.value, fullPath, (newPath) => {
                selectedPath = newPath
            })
            )
            folderName.remove()
        }
    })
})

