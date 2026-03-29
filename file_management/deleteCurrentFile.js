const fs = require('fs') 

const deleteFile = (currentState) => {
    currentPath = currentState.activeTab.filePath
    if (fs.existsSync(currentPath)) {
      console.log("trying to delete file")
      fs.unlinkSync(currentPath)
    } else {
      return "trigger-popup"
      //dialog.showMessageBox({message: `A file at ${filePath} doesnt exist\nSilly ;)`})
    }
}
module.exports = { deleteFile }
