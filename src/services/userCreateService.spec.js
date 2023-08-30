const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')
const AppError = require('../utils/AppError')

describe('UserCreateServiceTestSuite', () => {

    let userRepositoryInMemory = null
    let userCreateService = null
    
    beforeEach( () => {

        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)

    })


    test("User succesfully created", async () => {

        const user = {
            isAdmin: 0,
            name: "user_test",
            email: "user@test.com",
            password: 123456
        }

        const userRepositoryInMemory = new UserRepositoryInMemory()
        const userCreateService = new UserCreateService(userRepositoryInMemory)
        
        const userCreated = await userCreateService.execute( user )

        console.log(userCreated)

        expect(userCreated).toHaveProperty('id')

    })

    test("User should not be created with existing email", async () => {

        const user = {
            isAdmin: 0,
            name: "user_test",
            email: "user@test.com",
            password: 123456
        }

        const user1 = {
            isAdmin: 0,
            name: "user_test_1",
            email: "user@test.com",
            password: 123456
        }
        
        await userCreateService.execute(user)
        await expect( userCreateService.execute(user1) ).rejects.toEqual( new AppError('This email is already registered') )

    })

})