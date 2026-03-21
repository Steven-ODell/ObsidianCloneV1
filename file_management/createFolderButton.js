

const createFolderButton(folderName, filePath, (newPath) => {
    let newFolderButton = document.createElement('button')
    newFolderButton.className = "fileButton"
    newFolderButton.id = "button" + folderName
    newFolderButton.innerText = folderName
    selectedPath = newPath
    newFolderButton.onclick = async () => {
        onClickCallback(filePath)
    }
    return newFolderButton
})

module.exports = {createFolderButton}