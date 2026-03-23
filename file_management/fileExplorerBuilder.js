const fs = require('fs')
const path = require('path')

const buildTree = (currentPath) => {
    let currentTree = []
    let folderArray = fs.readdirSync(currentPath)
    folderArray.forEach(i => {
        let fullPath = path.join(currentPath, i)
        if (i.endsWith(".md")) {
            currentTree.push({
                type: "File",
                path: fullPath,
                name: i,
            })
        } else {
            currentTree.push({
                type: "Folder",
                path: fullPath,
                name: i,
                children: buildTree(fullPath)
            })
        }
    })
    return currentTree
}
module.exports = { buildTree }