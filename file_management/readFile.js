const { vaultPath } = require('../vaultConfig')

/* Since this is a node script it needs to have the ipc connection if you want to 
communicate with it from the browser window via buttons or inputs or whatever else*/
const fs = require('fs')
const path = require('path')

const readFile = (fileName, selectedPath) => {
    if (fileName) {
        return fs.readFileSync(selectedPath, 'utf8')
    }
}
module.exports = { readFile }
