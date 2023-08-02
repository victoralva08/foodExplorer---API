const { Router } = require('express')
const usersRoutes = Router()

const UsersControllerClass = require('../controllers/usersController')
const usersController = new UsersControllerClass()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

usersRoutes.post('/', usersController.createUser)
usersRoutes.put('/', ensureAuthenticated, usersController.updateUser)

module.exports = usersRoutes