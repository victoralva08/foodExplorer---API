const fs = require('fs') // file manipulation library
const path = require('path')
const imageUploadConfig = require('../imageConfig/upload.js')

class DiskStorage {

    async saveFile(file) {

        await fs.promises.rename( // this method serves the purpose of changing the file location between both folders
            path.resolve(imageUploadConfig.TMP_FOLDER, file),
            path.resolve(imageUploadConfig.UPLOADS_FOLDER, file)
        )
        
        return file

    }

    async deleteFile(file) {

        const filePath = path.resolve(imageUploadConfig.UPLOADS_FOLDER, file)

        try {
            await fs.promises.stat(filePath)
        } catch {
            return
        }

        await fs.promises.unlink(filePath)

    }
}

module.exports = DiskStorage