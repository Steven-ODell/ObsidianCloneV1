const { vaultPath } = require('../vaultConfig')

let directoryFolder = vaultPath

const fs = require('fs')
const path = require('path')

const saveFile = (currentState) => {
    if (!currentState.activeTab.fileTitle || currentState.activeTab.fileTitle.trim() === "") return null
    let documentHeaderTitle = currentState.activeTab.fileTitle + ".md"
    let cleanedTitle = documentHeaderTitle.replace(/[^a-zA-Z0-9 .]/g, "")
    filePath = path.join(currentState.activeFolder, cleanedTitle)
    // Check if the file exists for duplicate. 
    // If it exists clearly the file is taken so don't overwrite throw a dialog (in main.js)
    if (!(fs.existsSync(filePath))) {
        fs.writeFile(filePath, currentState.activeTab.fileContent, (err) => { if (err) console.log(err) })
    }
    else { return "duplicate" }
    let fileButtonName = cleanedTitle.replace(".md", "")
    return fileButtonName
    
}
module.exports = { saveFile }
