const createFolderButton = (folderName, folderPath, selectedPathSetter) => {
    let newFolderButton = document.createElement('button')
    newFolderButton.className = "folderButton"
    newFolderButton.id = "button" + folderName
    newFolderButton.innerText = folderName
    newFolderButton.onclick = (e) => {
        e.stopPropagation()
        selectedPathSetter(folderPath)
    }
    return newFolderButton
}

export { createFolderButton }