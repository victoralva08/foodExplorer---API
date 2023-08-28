const knex = require('../database/knexQueryBuilder')

class CheckoutCartController{

    async addItem(request, response){

        const { name, price, image, quantity } = request.body
        const { dish_id } = request.params
        const user_id  = request.user.id

        // first, we have to check if the user has already added the dish into the checkout cart

        const itemAlreadyAddedToCart = await knex('checkoutCart')
        .select('dishQuantity')
        .where({ dish_id })

        // if the dish is not registered in the cart, we'll insert the new dish item in the table

        if (itemAlreadyAddedToCart.length == 0) {

            await knex('checkoutCart').insert({
                dish_id: dish_id,
                dishName: name,
                dishPrice: price,
                dishImage: image,
                dishQuantity: quantity,
                user_id
            })

         // for the case the dish is already in the table, we have to is update its quantity value. We can filter the dish by its id value.

        } else if (itemAlreadyAddedToCart.length > 0) {

            const quantitySum = await knex('checkoutCart')
            .select(knex.raw('SUM(dishQuantity) as dishQuantitySum'))
            .where({ dish_id })

            // at the next line, we're adding the new selected quantity by the user to the already existing quantity value in the table
            const dishQuantityTotal = quantitySum[0].dishQuantitySum + quantity

            // once the quantity value is changed, we must update it in the table.
            await knex('checkoutCart')
            .update({
                dishQuantity: dishQuantityTotal
            })
            .where({ dish_id })

    
        }

        const checkoutCart = await knex('checkoutCart').where({user_id}).orderBy('updated_at')

        response.json({checkoutCart})
    }

    async deleteAllItems(request, response) {

        await knex('checkoutCart').delete()
        return response.json()

    }

    async deleteItem(request, response) {

        const { dish_id } = request.params

        await knex('checkoutCart').where({ dish_id }).first()
        .delete()

    }

    async returnDishCheckoutData(request, response) {

        const dishCheckoutData = await knex('checkoutCart').select('*')
        response.json(dishCheckoutData)
    }

    async returnCartDishesTotal(request, response) {

        const quantitySum = await knex('checkoutCart')
        .select(knex.raw('SUM(dishQuantity) as totalDishQuantity'))

        response.json(quantitySum[0].totalDishQuantity)

    }
}

module.exports = CheckoutCartController