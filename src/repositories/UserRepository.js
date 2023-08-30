const knex = require("../database/knexQueryBuilder")

class UserRespository {

    async findByEmail(email) {

        const UserExists = await knex('users').where({ email }).first()  // loading a connection with database
        return UserExists
        
    }


    async createUser({ isAdmin, name, email, password  }) {

        const user_id = await knex('users')
        .insert({
            isAdmin: isAdmin ?? 0,
            name,
            email,
            password
        })

        return { id: user_id }
        
    }

}

module.exports = UserRespository