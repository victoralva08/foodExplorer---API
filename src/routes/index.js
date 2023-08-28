const { Router } = require('express')

const usersRoutes = require('./users.Routes')
const dishesRoutes = require('./dishes.Routes')
const ingredientsRouter = require('./ingredients.Routes')
const sessionsRouter = require('./sessions.Routes')
const cartRouter = require('./cart.Routes')
const favoriteRouter = require('./favorites.Routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/sessions', sessionsRouter)
routes.use('/ingredients', ingredientsRouter)
routes.use('/cart', cartRouter)
routes.use('/favorites', favoriteRouter)

module.exports = routes