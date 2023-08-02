const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

const AppError = require("../utils/AppError")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

const MULTER_OBJECT = {

    storage: multer.diskStorage({

        destination: TMP_FOLDER,
        filename(request, file, callback) {

            const fileExtension = String(file.originalname.split('.')[1])
            console.log(fileExtension)

            if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'gif' && fileExtension !== 'jpeg') {
            return callback(new AppError('Please, upload a valid image file.'))
            }

            filehash = crypto.randomBytes(10).toString("hex")
            filename = `${filehash}-${file.originalname}`
        
            callback(null, filename) // callback returns the generated filename to Multer
        }


    })

} 

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER_OBJECT
}