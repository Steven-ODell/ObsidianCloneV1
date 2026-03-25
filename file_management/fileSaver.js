const { vaultPath } = require('../vaultConfig')

let directoryFolder = vaultPath

const fs = require('fs')
const path = require('path')

const saveFile = (inputTitle, documentString, selectedPath) => {
    if (!inputTitle || inputTitle.trim() === "") return null
    let documentHeaderTitle = inputTitle + ".md"
    let cleanedTitle = cleanTitle(documentHeaderTitle)
    filePath = path.join(selectedPath, cleanedTitle)
    // Check if the file exists for duplicate. 
    // If it exists clearly the file is taken so don't overwrite throw a dialog (in main.js)
    if (!(fs.existsSync(filePath))) {
        fs.writeFile(filePath, documentString, (err) => { if (err) console.log(err) })
    }
    else { return "duplicate" }
    let fileButtonName = cleanedTitle.replace(".md", "")
    return fileButtonName
    
}
module.exports = { saveFile }

const cleanTitle = (incomingTitle) => {
    return incomingTitle.replace(/[^a-zA-Z0-9 .]/g, "")
}