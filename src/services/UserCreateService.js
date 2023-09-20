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

        const hashedPassword = await hash(password, 8)
        console.log(hashedPassword)
        const userCreated = await this.userRepository.createUser({ isAdmin, name, email, hashedPassword })

        return userCreated

    }

}

module.exports = UserCreateService