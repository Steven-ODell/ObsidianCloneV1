const createNewFileButton = (fileName, inputBox, selectedPath) => {
    /* Create new button variable element and assign its id/class for css/inner.Text/
    -onclick allows the inputBox which was passed in to ask the IPC API to main to 
    handle the system level requirement of the function. This triggers main to process the 
    fs call in readFile function and send back the results*/
    let newFileButton = document.createElement('button')
    newFileButton.className = "fileButton"
    newFileButton.id = "button" + fileName
    newFileButton.innerText = fileName
    /* The stopPropagation was needed to stop from collapsing to the root folder
    always since the buttons sit in file-explorer div which changes path to root upon click */
    newFileButton.onclick = async (e) => {
        e.stopPropagation()
        if (!(fileName.endsWith(".md"))) {fileName = fileName + ".md"}
        inputBox.value = await window.api.readFile(fileName, selectedPath)
        inputBox.dispatchEvent(new Event('input'))
    }
    return newFileButton
}
export { createNewFileButton }

