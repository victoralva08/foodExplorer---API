class UserRepositoryInMemory {

    users = []

    async createUser({ isAdmin, name, email, password }) {

        const user = {
            id: Math.floor(Math.random() * 1000) + 1,
            isAdmin,
            name,
            email,
            password,
        }

        this.users.push( user )

        return user

    }

    async findByEmail( email ) {
		return this.users.find(user => user.email === email)
	}

}

module.exports = UserRepositoryInMemory