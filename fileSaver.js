const directoryFolder = '/Users/Steven/Desktop/Learning to Code 2026/JS/ElectronProjects/ObsidianCloneV1/TestVault'

const fs = require('fs')
const path = require('path')

const saveFile = (documentString) => {
    let documentSplit = documentString.split("\n")
    let documentHeaderTitle = documentSplit.at(1).substring(0, 10)
    filePath = path.join(directoryFolder, documentHeaderTitle)
    if (documentHeaderTitle) {
        fs.writeFile(filePath, documentString)
    }
}