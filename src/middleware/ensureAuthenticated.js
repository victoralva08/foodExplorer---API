const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authenticationConfig = require("../jwtConfig/auth")

function ensureAuthenticated(request, response, next) {

    // the token is gathered from the base environment in Bearer format after being generated through Sessions Controller
    const authorizationHeader = request.headers.authorization

    if (!authorizationHeader) {
        throw new AppError("Uniformed JWT Token", 401)
    }

    const [, token] = authorizationHeader.split(" ")

    try {

        // comparing authorizationHeader token with secret JWT object property
        const { sub: user_id } = verify(token, authenticationConfig.secret)

        // user.id object property gets the user_id token value
        request.user = {
            id: Number(user_id)
        }

        return next()

    } catch {
        throw new AppError("Invalid JWT Token", 401)
    }
}

module.exports = ensureAuthenticated