const knex = require('../database/knexQueryBuilder')

class CategoriesController{
    async show(request, response){

        const categories = await knex('categories')
        .orderBy('category')
        .groupBy("category")

        return response.json(categories)
    }
}

module.exports = CategoriesController