const { Router } = require('express')
const cartRoutes = Router()

const CheckoutCartControllerClass = require('../controllers/checkoutController')
const checkoutCartController = new CheckoutCartControllerClass()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')
cartRoutes.use(ensureAuthenticated)

cartRoutes.post('/:dish_id', checkoutCartController.addItem)  

cartRoutes.delete('/', checkoutCartController.deleteAllItems)
cartRoutes.delete('/:dish_id', checkoutCartController.deleteItem)

cartRoutes.get('/cart-orders', checkoutCartController.returnDishCheckoutData)
cartRoutes.get('/', checkoutCartController.returnCartDishesTotal)

module.exports = cartRoutes