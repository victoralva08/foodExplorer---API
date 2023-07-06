const { Router } = require('express')

const usersRoutes = require('./users.Routes')
const dishesRoutes = require('./dishes.Routes')
const categoriesRoutes = require('./categories.Routes')
const ingredientsRoutes = require('./ingredients.Routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/ingredients', ingredientsRoutes)

module.exports = routes