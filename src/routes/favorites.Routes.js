const { Router } = require('express')
const favoriteRoutes = Router()

const FavoritesControllerClass = require('../controllers/favoritesController')
const favoritesController = new FavoritesControllerClass()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')
favoriteRoutes.use(ensureAuthenticated)

favoriteRoutes.get('/:dish_id', favoritesController.filterFavoriteDishes) 
favoriteRoutes.post('/:dish_id', favoritesController.favoriteDish)  
favoriteRoutes.delete('/:dish_id', favoritesController.deleteFavoriteDish)
favoriteRoutes.get('/', favoritesController.showFavoritedDishes)

module.exports = favoriteRoutes