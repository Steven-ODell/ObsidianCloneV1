const createNewFileButton = (fileName, inputBox, selectedPath) => {
    /* Create new button variable element and assign its id/class for css/inner.Text/
    -onclick allows the inputBox which was passed in to ask the IPC API to main to 
    handle the system level requirement of the function. This triggers main to process the 
    fs call in readFile function and send back the results*/
    let newFileButton = document.createElement('button')
    newFileButton.className = "fileButton"
    newFileButton.id = "button" + fileName
    newFileButton.innerHTML = `<svg class="fileSVG" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="whitesmoke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="7.5" x2="10" y2="7.5" />
                                </svg>` + fileName
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

