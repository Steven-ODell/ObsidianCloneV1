const createFolderButton = (folderName, folderPath, selectedPathSetter) => {
    let newFolderButton = document.createElement('button')
    newFolderButton.className = "folderButton"
    newFolderButton.id = "button" + folderName
    newFolderButton.innerText = folderName
    /* The stopPropagation was needed to stop from collapsing to the root folder
    always since the buttons sit in file-explorer div which changes path to root upon click */
    newFolderButton.onclick = (e) => {
        e.stopPropagation()
        selectedPathSetter(folderPath)
    }
    return newFolderButton
}

export { createFolderButton }