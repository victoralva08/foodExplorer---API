const knex = require('../database/knexQueryBuilder')

class IngredientsController{
    async show(request, response){

        const ingredients = await knex('ingredients')
        .orderBy('name')
        .groupBy("name")

        return response.json(ingredients)
    }
}

module.exports = IngredientsController