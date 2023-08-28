const knex = require("../database/knexQueryBuilder")
const AppError = require('../utils/AppError')

class DishesController {

    async createDish(request, response) {

        const { name, category, description, ingredients, price } = request.body
        const user_id  = request.user.id

        // capturing the dish_id for ingredients, category and price tables

        const dish_id_array = await knex('dishes').insert({
            name,
            category,
            description,
            price,
            image: "dish_image",
            user_id
        })

        const dish_id = dish_id_array[0]

        // inserting ingredients and prices values

        const ingredientsInsert = ingredients.map( ingredient => {
            return {
                name: ingredient,
                dish_id
            }
        })

        await knex('ingredients').insert(ingredientsInsert)

        return response.json(dish_id);
    }

    async showDishes(request, response) {

        const { dish_id } = request.params
    
        const dish = await knex('dishes').where({ id: dish_id }).first()
        const ingredientsResponse = await knex('ingredients').select('name').where({ dish_id }).orderBy('name')

        // knex response returns an array of ingredients objects. In these next lines, those objects (with the ingredients' names as properties) are being added to an array (ingredients) to be treated on frontend manipulation.

        let ingredients = []

        ingredientsResponse.map( ingredientProp => {
            ingredients = [ ...ingredients, ingredientProp.name ]
        })
        
        return response.json({
            dish,
            ingredients
        })
        
    }

    async deleteDish(request, response) {

        const { dish_id } = request.params

        await knex('dishes').where({ id: dish_id }).first()
        .delete()

        return response.json()

    }

    async filterDishes(request, response) {

        const { dishNameOrIngredients } = request.query

        let dishes

        const ingredientsTable = await knex('ingredients')

        if (dishNameOrIngredients) { // if the ingredients were informed in the request object
  
            dishes = await knex('dishes')
            .select([
                'dishes.id',
                'dishes.name',
                'dishes.description',
                'dishes.image',
                'dishes.price',
                'dishes.user_id'
            ])
            .innerJoin('ingredients', 'ingredients.dish_id', 'dishes.id')
            .where('ingredients.name', 'like', `%${dishNameOrIngredients}%`)
            .orWhere('dishes.name', 'like', `%${dishNameOrIngredients}%`)
            .orderBy('dishes.name')
            .groupBy('dishes.id')

        } else {

            dishes = await knex('dishes')
            .select([ // which dish properties will be displayed as response
                'dishes.id',
                'dishes.name',
                'dishes.category',
                'dishes.image',
                'dishes.description',
                'dishes.price',
                'dishes.user_id'
            ])
            .orderBy('name','asc')
        }

        const dishesWithIngredientes = dishes.map(dish => {

            const dishIngredients = ingredientsTable.filter(ingredient => ingredient.dish_id === dish.id)  
            const dishIngredientsName = dishIngredients.map(filteredIngredients => filteredIngredients.name)


            return {
                ...dish,
                ingredients: dishIngredientsName,
            }

        })

        return response.json(dishesWithIngredientes)
        
    }

    async updateDish(request, response) {

        const { name, category, ingredients, price, description } = request.body
        const { dish_id }  = request.params

        // checking if the dish exists

        const dishExists = await knex('dishes').where({ id: dish_id }).first()

        if(!dishExists) {
            throw new AppError("This dish is not registered.")
        }

        const dishNameAlreadyRegistered = await knex('dishes').where({ name }).first()

        if ( dishNameAlreadyRegistered && dishNameAlreadyRegistered.id != dish_id ) {
            throw new AppError("A dish with this name is already registered.")
        }

        // checking if the user wishes to update its name and email values

        const dishName = name ?? dishExists.name
        const dishCategory = category ?? dishExists.category
        const dishIngredients = ingredients ?? dishExists.ingredients
        const dishPrice = price ?? dishExists.price
        const dishDescription = description ?? dishExists.description
 
        // updating values in database table

        await knex("dishes").where({ id: dish_id })
        .update({

            name: dishName,
            category: dishCategory,
            price: dishPrice,
            description: dishDescription,
            updated_at: knex.fn.now()

        })

        /* 
        The previous ingredients are deleted for replacement.
        As the ingredients are stored in an array, we must request to add them in the table for each item (ingredient) from the array.
        If we simply apply the update method, only the last array item (ingredient) will be stored with the correspondent dish_id.
        For avoiding that, the ingredients have to be deleted and added all over again, thus including new or changed ones.
         */
        await knex('ingredients')
        .where({ dish_id }) 
        .del()

        /* 
        The ingnredientsUpdate array will store the ingredients objects (with the correspondent dish_id) which will be added in the ingredients
        table.
        */
        const ingredientsUpdate = dishIngredients.map( ingredient => {
            return {
                name: ingredient,
                dish_id
            }
        })

        ingredientsUpdate.map(async ingredientProps => {
            await knex('ingredients')
            .insert(ingredientProps)
        })

        return response.status(200).json()

    }
     
}

module.exports = DishesController