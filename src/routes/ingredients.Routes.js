const { Router } = require('express')
const ingredientsRoutes = Router()

const IngredientsControllerClass = require('../controllers/ingredientsController')
const ingredientsController = new IngredientsControllerClass()

ingredientsRoutes.get('/', ingredientsController.show)  

module.exports = ingredientsRoutes