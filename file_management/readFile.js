const directoryFolder = '/Users/Steven/Desktop/Learning to Code 2026/JS/ElectronProjects/ObsidianCloneV1/TestVault'

const fs = require('fs')
const path = require('path')

const readFile = (fileName) => {
    if (fileName){
        let currentFilePath = path.join(directoryFolder, fileName)
        return fs.readFileSync(currentFilePath, 'utf8')
    }
}
module.exports = { readFile }