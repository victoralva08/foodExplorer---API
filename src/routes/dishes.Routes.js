const { Router } = require('express')
const dishesRoutes = Router()

const DishesControllerClass = require('../controllers/dishesController')
const dishesController = new DishesControllerClass()

dishesRoutes.post('/:user_id', dishesController.createDish)  
dishesRoutes.delete('/:dish_id', dishesController.deleteDish)
dishesRoutes.get('/:dish_id', dishesController.showDishes)
dishesRoutes.get('/', dishesController.filterDishes)

module.exports = dishesRoutes