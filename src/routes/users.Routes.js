const { Router } = require('express')
const usersRoutes = Router()

const UsersControllerClass = require('../controllers/usersController')
const usersController = new UsersControllerClass()

usersRoutes.post('/', usersController.createUser)
usersRoutes.put('/:user_id', usersController.updateUser)

module.exports = usersRoutes