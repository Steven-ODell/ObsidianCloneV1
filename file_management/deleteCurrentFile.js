const fs = require('fs').promises

const deleteFile = async (currentState) => {
    currentPath = currentState.activeTab.filePath
    try {
        await fs.access(currentPath)
        await fs.unlink(currentPath)
        console.log(`File deleted`)
        return "file-deleted"
    } catch (e) {
        return "trigger-popup"
    }
   /* if (fs.access(currentPath)) {
      console.log("trying to delete file")
      fs.unlinkSync(currentPath)
    } else {
      return "trigger-popup"
      //dialog.showMessageBox({message: `A file at ${filePath} doesnt exist\nSilly ;)`})
    }*/
}
module.exports = { deleteFile }
