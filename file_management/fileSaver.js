const { vaultPath } = require('../vaultConfig')

const directoryFolder = vaultPath

const fs = require('fs')
const path = require('path')

const saveFile = (documentString) => {
    if (!documentString || documentString.trim() === "") return null
    let documentSplit = documentString.split("\n")
    if (documentSplit){
        let documentHeaderTitle = (documentSplit.at(0).substring(0, 15)) + ".md"
        let cleanedTitle = cleanTitle(documentHeaderTitle)
        filePath = path.join(directoryFolder, cleanedTitle)
        // Check if the file exists
        if (!(fs.existsSync(filePath))) { 
            fs.writeFile(filePath, documentString, (err) => { if (err) console.log(err) })
        }
        else {return "duplicate"}
        return cleanedTitle
    }
}
module.exports = { saveFile }

const cleanTitle = (incomingTitle) => {
    return incomingTitle.replace(/[^a-zA-Z0-9 .]/g, "")
}