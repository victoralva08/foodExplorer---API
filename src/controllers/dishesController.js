const knex = require("../database/knexQueryBuilder")

class DishesController {

    async createDish(request, response) {

        const { name, categories, description, ingredients, price } = request.body
        const { user_id } = request.params

        // capturing the dish_id for ingredients, category and price tables

        const dish_id_array = await knex('dishes').insert({
            name,
            description,
            price,
            avatar: "avatar",
            user_id
        })

        const dish_id = dish_id_array[0]

        // inserting category(ies)

        const categoriesInsert = categories.map( category => {
            return {
                category,
                dish_id
            }
        })
     
        await knex('categories').insert(categoriesInsert)

        // inserting ingredients and prices values

        const ingredientsInsert = ingredients.map( ingredient => {
            return {
                name: ingredient,
                dish_id
            }
        })

        await knex('ingredients').insert(ingredientsInsert)

        await knex('prices').insert({
            price,
            dish_id
        })

        return response.json();
    }

    async showDishes(request, response) {

        const { dish_id } = request.params
    
        const dish = await knex('dishes').where({ id: dish_id }).first()
        const ingredients = await knex('ingredients').where({ dish_id }).orderBy('name')
        const categories = await knex('categories').where({ dish_id }).orderBy('created_at')
    
        return response.json({
            dish,
            ingredients,
            categories
        })
        
    }

    async deleteDish(request, response) {

        const { dish_id } = request.params

        await knex('dishes').where({ id: dish_id }).first()
        .delete()

        return response.json()

    }

    async filterDishes(request, response) {

        const {  } = request.body
        const { user_id, dishName, categories, ingredients } = request.query

        let dishes

        const ingredientsTable = await knex('ingredients')
        const categoriesTable = await knex('categories')

        if (categories) {

            const filterByCategory = categories.split(',').map( category => category.trim() )

            dishes = await knex('categories')
            .innerJoin('dishes', 'dishes.id', 'categories.dish_id')
            .select([ // which dish properties will be displayed as response
                'dishes.id',
                'dishes.name',
                'dishes.price',
                'dishes.user_id'
            ])
            .where('dishes.user_id', user_id)
            .whereLike('dishes.name', `%${dishName}%`)
            .whereIn('categories.category', filterByCategory)
            .orderBy('dishes.name')
            .groupBy('dishes.id')

        }
        
        if (ingredients) { // if the ingredients were informed in the request object

            const filterByIngredients = ingredients.split(',').map( ingredient => ingredient.trim() )

            dishes = await knex('ingredients')
            .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
            .select([ // which dish properties will be displayed as response
                'dishes.id',
                'dishes.name',
                'dishes.price',
                'dishes.user_id'
            ])
            .where('dishes.user_id', user_id)
            .whereLike('dishes.name', `%${dishName}%`)
            .whereIn('ingredients.name', filterByIngredients)
            .orderBy('dishes.name')
            .groupBy('dishes.id')

        } else {

            dishes = await knex('dishes')
            .select([ // which dish properties will be displayed as response
                'dishes.id',
                'dishes.name',
                'dishes.price',
                'dishes.user_id'
            ])
            .where({ user_id })
            .whereLike('name', `%${dishName}%`)
            .orderBy('id')

        }

        const dishesWithIngredientes = dishes.map(dish => {

            const dishIngredients = ingredientsTable.filter(ingredient => ingredient.dish_id === dish.id)  
            const dishIngredientsName = dishIngredients.map(filteredIngredients => filteredIngredients.name)

            const dishCategories = categoriesTable.filter(category => category.dish_id === dish.id)  
            const dishCategoriesName = dishCategories.map(filteredCategories => filteredCategories.category)

            return {
                ...dish,
                ingredients: dishIngredientsName,
                categories: dishCategoriesName
            }

        })

        return response.json(dishesWithIngredientes)
        
    }
     
}

module.exports = DishesController