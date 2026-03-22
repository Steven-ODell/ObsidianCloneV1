const createNewFileButton = (fileName, inputBox) => {
    /* Create new button variable element and assign its id/class for css/inner.Text/
    -onclick allows the inputBox which was passed in to ask the IPC API to main to 
    handle the system level requirement of the function. This triggers main to process the 
    fs call in readFile function and send back the results*/
    let newFileButton = document.createElement('button')
    newFileButton.className = "fileButton"
    newFileButton.id = "button" + fileName
    newFileButton.innerText = fileName
    newFileButton.onclick = async () => {
        inputBox.value = await window.api.readFile(fileName)
    }
    return newFileButton
}
export { createNewFileButton }

