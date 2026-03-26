const createNewFileButton = (fileName, inputBox, inputTitle, selectedPath, currentState) => {
    /* Create new button variable element and assign its id/class for css/inner.Text/
    -onclick allows the inputBox which was passed in to ask the IPC API to main to 
    handle the system level requirement of the function. This triggers main to process the 
    fs call in readFile function and send back the results*/
    let newFileButton = document.createElement('button')
    newFileButton.className = "fileButton"
    newFileButton.id = "button" + fileName
    newFileButton.innerHTML = `<svg class="fileSVG" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="whitesmoke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M 4 2 V 13 H 11 V 5 L 8 2 Z" />
                                <polyline points="8 2 8 5 11 5" />
                                </svg>` + " " + (fileName.replace(".md", ""))
    /* The stopPropagation was needed to stop from collapsing to the root folder
    always since the buttons sit in file-explorer div which changes path to root upon click */
    newFileButton.onclick = async (e) => {
        e.stopPropagation()
        if (fileName.endsWith(".png")) {currentState.activeTab.fileType = ".png"}
        else {currentState.activeTab.fileType = "File"}

        currentState.activeTab.fileTitle = fileName
        currentState.activeTab.filePath = selectedPath
        if (currentState.activeTab.fileType !== ".png") {currentState.activeTab.fileContent = await window.api.readFile(fileName, selectedPath)}
        
        inputTitle.value = currentState.activeTab.fileTitle.replace(".md", "")
        inputTitle.dispatchEvent(new Event('input'))
        inputBox.value = currentState.activeTab.fileContent
        inputBox.dispatchEvent(new Event('input'))
    }
    return newFileButton
}
export { createNewFileButton }

