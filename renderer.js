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

//Gets callback of vault tree to build the buttons with
window.api.createTreeOnStart((event, vaultTree) => {
    buildButtons(vaultTree, fileExplorer)
})

const buildButtons = (treeArray, containerDiv) => {
    treeArray.forEach(i => {
        if (i.type === "File") {
            containerDiv.append(createNewFileButton(i.name.replace(".md", ""), inputBox, i.path))
        }
        if (i.type === "Folder") {
            // create folder button, append to containerDiv
            let folderButton = createFolderButton(i.name, i.path, (newPath) => {
                selectedPath = newPath
            })
            let folderWrapperDiv = document.createElement('div')
            folderWrapperDiv.className = 'folder-wrapper-div'
            folderWrapperDiv.style.display = 'none'
            folderButton.addEventListener('click', () => {
                if (folderWrapperDiv.style.display === 'none') {
                    folderWrapperDiv.style.display = 'block'
                } else {
                    folderWrapperDiv.style.display = 'none'
                }
            })
            containerDiv.append(folderButton)
            buildButtons(i.children, folderWrapperDiv)
            containerDiv.append(folderWrapperDiv)
        }
    })
}

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

/* Create input for folder name. Focus that and check for typing.
Add the button visual in explorer to see it. Focus that to type name
If enter is pressed or unfocus from folder keep the name if it exists.
After all that then send the folder to get created with the name and link it 
to the path currently highlighted via selectedPath and the button that 
was temporary input gets deleted and new button created takes place. 
Looks like seamless typing name and then create folder.
*/
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

