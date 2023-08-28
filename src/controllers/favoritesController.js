const knex = require('../database/knexQueryBuilder')

class FavoritesController{

    async favoriteDish(request, response) {

        const { name, category, price, image } = request.body
        const { dish_id } = request.params
        const user_id  = request.user.id

        await knex('favoriteDishes').insert({
            dish_id,
            dishName: name,
            dishCategory: category,
            dishPrice: price,
            dishImage: image,
            user_id
        })

        const favoriteDishes = await knex('favoriteDishes').where({user_id}).orderBy('updated_at')

        response.json({favoriteDishes})

    }

    async deleteFavoriteDish(request, response) {

        const { dish_id } = request.params
        const user_id  = request.user.id

        await knex('favoriteDishes').where({ dish_id }).where({ user_id }).first()
        .delete()

        return response.json()

    }

    async filterFavoriteDishes(request, response) {

        const { dish_id } = request.params
        const user_id  = request.user.id

        if(dish_id){

            const filteredfavoriteDishes = await knex('favoriteDishes')
            .where({ dish_id })
            .where({ user_id })

            return response.json(filteredfavoriteDishes[0])

        } else {

            const favoriteDishes = await knex('favoriteDishes').orderBy('id')
            return response.json({favoriteDishes})

        }
        
    }

    async showFavoritedDishes(request, response) {

        const user_id  = request.user.id

        const favoritedDishesData = await knex('favoriteDishes').select('*').where({ user_id }).orderBy('dishName')
        response.json(favoritedDishesData)

    }
    
}

module.exports = FavoritesController