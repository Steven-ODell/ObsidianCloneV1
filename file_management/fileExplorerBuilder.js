const fs = require('fs')
const path = require('path')

const buildTree = (currentPath, depth) => {
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
        } else {
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
module.exports = { buildTree }