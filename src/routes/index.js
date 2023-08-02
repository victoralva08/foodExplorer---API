const { Router } = require('express')

const usersRoutes = require('./users.Routes')
const dishesRoutes = require('./dishes.Routes')
const ingredientsRoutes = require('./ingredients.Routes')
const sessionsRouter = require('./sessions.Routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/sessions', sessionsRouter)
routes.use('/ingredients', ingredientsRoutes)

module.exports = routes