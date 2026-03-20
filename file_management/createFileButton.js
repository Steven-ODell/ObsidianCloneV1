
const createNewFileButton = (fileName, inputBox) => {
    let newFileButton = document.createElement('button')
    newFileButton.className = "fileButton"
    newFileButton.id = "button" + fileName
    newFileButton.innerText = fileName
    newFileButton.onclick = async () => {
        inputBox.value = await window.api.readFile(fileName)
    }
    return newFileButton
}
export {createNewFileButton}