const createFolderButton = (folderName, folderPath, selectedPathSetter) => {
    let newFolderButton = document.createElement('button')
    newFolderButton.className = "folderButton"
    newFolderButton.id = "button" + folderName
    newFolderButton.innerHTML = `<svg class="folderSVG" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 2 10 10" fill="none" stroke="whitesmoke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M 6.5 4 L 8.5 7.5 L 6.5 11" />
                                </svg>` + "  " + folderName
    /* The stopPropagation was needed to stop from collapsing to the root folder
    always since the buttons sit in file-explorer div which changes path to root upon click */
    newFolderButton.onclick = (e) => {
        e.stopPropagation()
        newFolderButton.classList.toggle('open')
        selectedPathSetter(folderPath)
    }
    return newFolderButton
}

export { createFolderButton }