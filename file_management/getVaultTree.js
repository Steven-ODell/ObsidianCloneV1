const fs = require('fs')
const path = require('path')

const getVaultTree = (currentPath, depth) => {
    let currentTree = []
    let folderArray = fs.readdirSync(currentPath)
    folderArray.forEach(i => {
        let fullPath = path.join(currentPath, i)
        if (i.endsWith(".md")) {
            currentTree.push({
                type: "File",
                path: fullPath,
                name: i,
                depth: depth,
            })
        } else if (i.endsWith(".png")) {
            currentTree.push({
                type: ".png",
                path: fullPath,
                name: i,
                depth: depth,
            })
        } else if (fs.statSync(fullPath).isDirectory()) {
            currentTree.push({
                type: "Folder",
                path: fullPath,
                name: i,
                //increase depth for folders to later add nesting indent
                depth: depth + 1,
                children: buildTree(fullPath, depth + 1),
            })
        }

    })
    return currentTree
}
module.exports = { getVaultTree }