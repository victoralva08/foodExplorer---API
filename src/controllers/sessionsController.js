const knex = require("../database/knexQueryBuilder/index.js")
const AppError = require("../utils/AppError.js")
const { compare } = require("bcrypt")

const authenticationConfig = require("../jwtConfig/auth.js")
const { sign } = require("jsonwebtoken")

class SessionsController {

    async create(request, response) {
        const { email, password } = request.body

        // user checkpoint

        const user = await knex("users").where({ email }).first()

        if (!user) {
            throw new AppError("Email or password incorrect.", 401)

        }

        const passwordMatch = await compare(password, user.password)
        
        if (!passwordMatch) {
            throw new AppError("Email or password incorrect.", 401)
        }

        // generating the user authentication token

        const { secret, expiresIn } = authenticationConfig
        const token = sign(
            {}, secret, {
                subject: String(user.id),
                expiresIn
            })

        return response.json( {user, token} )
    }

}

module.exports = SessionsController