const { Router } = require('express')
const dishesRoutes = Router()

const DishesController = require('../controllers/dishesController');
const dishesController = new DishesController();

const DishImageControllerClass = require('../controllers/dishImageController')
const dishImageController = new DishImageControllerClass()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')
dishesRoutes.use(ensureAuthenticated)

const uploadConfig = require("../imageConfig/upload")
const multer = require("multer")
const upload = multer(uploadConfig.MULTER_OBJECT) // multer library allows image file loading

dishesRoutes.post('/', dishesController.createDish)
dishesRoutes.put('/:dish_id', dishesController.updateDish)

dishesRoutes.delete('/:dish_id', dishesController.deleteDish)

dishesRoutes.get('/:dish_id', dishesController.showDishes)
dishesRoutes.get('/', dishesController.filterDishes)

dishesRoutes.patch("/dish_image/:dish_id", upload.single("dish_image"), dishImageController.updateDishImage)

module.exports = dishesRoutes