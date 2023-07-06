const { Router } = require('express')
const categoriesRoutes = Router()

const CategoriesControllerClass = require('../controllers/categoriesController')
const categoriesController = new CategoriesControllerClass()

categoriesRoutes.get('/', categoriesController.show)  

module.exports = categoriesRoutes