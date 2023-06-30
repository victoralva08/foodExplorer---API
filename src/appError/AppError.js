class AppError {
    statusCode = 400
    message

    constructor(statusCode, message) {
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = AppError