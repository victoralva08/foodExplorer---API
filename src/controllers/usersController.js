const knex = require("../database/knexQueryBuilder")
const AppError = require('../utils/AppError.js')
const { hash, compare } = require('bcrypt')

class UsersController {

    async createUser(request, response) {

        const { isAdmin, name, email, password } = request.body // capturing user's properties

        // For the case which the user is already registered:

        const UserExists = await knex('users').where({ email }).first()  // loading a connection with database

        if(UserExists) {
            throw new AppError("This email is already registered")
        }

        const cypheredPassword = await hash(password, 8)

        await knex('users')
        .insert({
            isAdmin: isAdmin ?? 0,
            name,
            email,
            password: cypheredPassword
        })

        return response.status(201).json()

    }

    async updateUser(request, response) {
        const { name, email, password, newPassword } = request.body
        const user_id  = request.user.id

        // checking if the user exists

        const userExists = await knex('users').where({ id: user_id }).first()

        if(!userExists) {
            throw new AppError("This user is not registered.")
        }

        const emailAlreadyRegistered = await knex('users').where({ email }).first()

        if ( emailAlreadyRegistered && emailAlreadyRegistered.id != user_id ) {
            throw new AppError("This email is already registered.")
        }

        // checking if the user wishes to update its name and email values

        const userName = name ?? userExists.name
        const userEmail = email ?? userExists.email

        // checking password change conditions

        if ( !password && newPassword) {

            throw new AppError("Please, inform your current password.")

        } else if ( password && newPassword ) {

            const checkCurrentPassword = await compare(password, userExists.password)  

            if (!checkCurrentPassword){
                throw new AppError("Please, inform the correct current password.")
            }

            userExists.password = await hash(newPassword, 8)

        }

        // updating values in database table

        await knex("users").where({ id: user_id })
        .update({
            name: userName,
            email: userEmail,
            password: userExists.password,
            updated_at: knex.fn.now()
        })

        return response.status(200).json()

    }
}

module.exports = UsersController