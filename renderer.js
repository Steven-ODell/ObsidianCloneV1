import { mdRenderer } from "./parser/RendererV3.js";
import { createNewFileButton } from "./file_management/createFileButton.js";
import { blockParser } from "./parser/MainParserV3.js";
import { createFolderButton } from "./file_management/createFolderButton.js";
import { currentState } from "./state.js";


const inputBox = document.getElementById("main-editor-text-area");
const outputDiv = document.getElementById("main-editor-div");
const previewButton = document.getElementById("toggle-preview");
const editorButton = document.getElementById("toggle-editor");
const feToolBarNewFileButton = document.getElementById("fe-new-file");
const feToolBarNewFolderButton = document.getElementById("fe-new-folder");
const sideToolBarNewFile = document.getElementById("tool-bar-new-file-button");
const fileExplorer = document.getElementById("file-explorer");
const saveFileTopBar = document.getElementById("save-file-top-bar");
const inputTitle = document.getElementById("editor-name-input");
let fileTitle = ""

//Gets callback of vault tree to build the buttons with
window.api.createTreeOnStart((event, vaultTree) => {
    currentState.vaultTree = vaultTree
    buildButtons(currentState.vaultTree, fileExplorer)
    console.log(currentState.vaultTree)
})

// Set-up on start up
inputBox.style.backgroundColor = 'rgb(19, 19, 19)';
inputBox.style.color = 'rgb(238, 238, 238)';
inputBox.style.zIndex = 2;

inputTitle.addEventListener('input', () => {
    fileTitle = inputTitle.value
})

inputBox.addEventListener('input', () => {
    currentState.activeTab.fileContent = inputBox.value
    currentState.activeTab.fileTitle = inputTitle.value
    renderPreview(currentState, inputBox)
    console.log(currentState)
})

previewButton.addEventListener('click', () => {
    currentState.previewMode = true
    renderPreview(currentState, inputBox)
    console.log(currentState)
})

editorButton.addEventListener('click', () => {
    currentState.previewMode = false
    renderPreview(currentState, inputBox)
    console.log(currentState)
})

sideToolBarNewFile.addEventListener('click', async () => {
    const newFile = await window.api.saveFile(currentState)
    if (!newFile) return
    if (newFile === "duplicate") {
        return
    }
    inputBox.value = ""
    inputTitle.value = ""
    fileExplorer.append(createNewFileButton(newFile, inputBox, currentState.activeFolder))
    
    currentState.vaultTree = await window.api.getVaultTree()
    renderFileExplorer(currentState, fileExplorer)
})

fileExplorer.addEventListener('click', () => {
    currentState.activeFolder = '/Users/Steven/Desktop/Learning to Code 2026/JS/ElectronProjects/ObsidianCloneV1/TestVault'
})

feToolBarNewFileButton.addEventListener('click', async () => {
    /* Sending the signal to the Main.js through the IPC tunnel to 
    process the call which needs system access which is why this window.api is needed*/
    const newFile = await window.api.saveFile(currentState)
    if (!newFile) return
    if (newFile === "duplicate") {
        return
    }
    inputBox.value = ""
    inputTitle.value = ""
    fileExplorer.append(createNewFileButton(newFile, inputBox, currentState.activeFolder))
    
    currentState.vaultTree = await window.api.getVaultTree()
    renderFileExplorer(currentState, fileExplorer) 
})

/* Create input for folder name. Focus that and check for typing.
Add the button visual in explorer to see it. Focus that to type name
If enter is pressed or unfocus from folder keep the name if it exists.
After all that then send the folder to get created with the name and link it 
to the path currently highlighted via currentState.activeFolder and the button that 
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
            const fullPath = await window.api.createFolder(currentState.activeFolder, folderName.value)
            fileExplorer.append(createFolderButton(folderName.value, fullPath, (newPath) => {
                currentState.activeFolder = newPath
            })
            )
            folderName.remove()

            /* Get the new file tree. check which folders are 'open' with clearFileExplorerDiv()
            then add those to an array to later reopen them. Have buttons get built then go through 
            each button and if it was saved in the list to be open then open them with {k.click()} */
            
            currentState.vaultTree = await window.api.getVaultTree()
            renderFileExplorer(currentState, fileExplorer)  
        }
    })
})

const buildButtons = (treeArray, containerDiv) => {
    treeArray.forEach(i => {
        if (i.type === "File") {
            containerDiv.append(createNewFileButton(i.name, inputBox, i.path))
        }
        if (i.type === "Folder") {
            // create folder button, append to containerDiv
            let folderButton = createFolderButton(i.name, i.path, (newPath) => {
                currentState.activeFolder = newPath
            })
            let folderWrapperDiv = document.createElement('div')
            folderWrapperDiv.className = 'folder-wrapper-div'
            folderWrapperDiv.style.display = 'none'
            folderButton.addEventListener('click', () => {
                if (folderWrapperDiv.style.display === 'none') {
                    folderWrapperDiv.style.display = 'block'
                    folderButton.style.backgroundColor = "rgb(19, 19, 19)"
                } else {
                    folderWrapperDiv.style.display = 'none'
                    folderButton.style.backgroundColor = "rgb(28, 28, 28)"
                }
            })
            // Offset the files within the folder when opening
            folderWrapperDiv.style.marginLeft = (i.depth * 10) + "px"
            containerDiv.append(folderButton)
            buildButtons(i.children, folderWrapperDiv)
            containerDiv.append(folderWrapperDiv)
        }
    })
}

/* Create an array of the currently opened folders to then reopen them on the button refresh */
const clearFileExplorerDiv = (fileExplorerDiv) => {
    let explorerSplit = Array.from(fileExplorerDiv.children)
    let saveArray = []
    explorerSplit.forEach(i => {
        if (i.classList.contains('open')) {saveArray.push(i.id)}
        if (i.id === 'file-explorer-tool-bar') {return}
        else {i.remove()}
    })
    return saveArray
}

const renderFileExplorer = (currentState, fileExplorerDiv) => {
    let explorerSaver = clearFileExplorerDiv(fileExplorerDiv)
    buildButtons(currentState.vaultTree, fileExplorerDiv)
    Array.from(fileExplorerDiv.children).forEach(k => {
        if (explorerSaver.includes(k.id)) { k.click() }
    })   
}

const renderPreview = (currentState, inputBox) => {
    const rootReadyForRender = blockParser(inputBox.value)
    outputDiv.innerHTML = mdRenderer(rootReadyForRender)    
    if (currentState.previewMode === true) {
    inputBox.style.backgroundColor = 'transparent';
    inputBox.style.color = 'transparent';
    inputBox.style.zIndex = 0;
    }
    else {
    inputBox.style.backgroundColor = 'rgb(19, 19, 19)';
    inputBox.style.color = 'rgb(238, 238, 238)';
    inputBox.style.zIndex = 2;
    }
}