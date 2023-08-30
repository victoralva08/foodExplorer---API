const { hash } = require('bcrypt')
const AppError = require('../utils/AppError.js')

class UserCreateService {

    constructor( userRepository ) {
        this.userRepository = userRepository
    }

    async execute({ isAdmin, name, email, password }) {

        // For the case which the user is already registered:

        const UserExists = await this.userRepository.findByEmail(email)

        if(UserExists) {
            throw new AppError("This email is already registered")
        }

        const cypheredPassword = await hash(String(password), 8)
        const userCreated = await this.userRepository.createUser({ isAdmin, name, email, cypheredPassword })

        return userCreated

    }

}

module.exports = UserCreateService