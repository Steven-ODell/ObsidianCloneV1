const { vaultPath } = require('../vaultConfig')

let directoryFolder = vaultPath

/* Since this is a node script it needs to have the ipc connection if you want to 
communicate with it from the browser window via buttons or inputs or whatever else*/
const fs = require('fs')
const path = require('path')

const readFile = (fileName, folderPath) => {
    if (fileName) {
        let currentFilePath = path.join(folderPath, (fileName + ".md"))
        return fs.readFileSync(currentFilePath, 'utf8')
    }
}
module.exports = { readFile }
