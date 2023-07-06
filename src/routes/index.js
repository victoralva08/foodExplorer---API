const { Router } = require('express')

const usersRoutes = require('./users.Routes')
const dishesRoutes = require('./dishes.Routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)

module.exports = routes