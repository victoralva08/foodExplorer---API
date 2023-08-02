const knex = require("../database/knexQueryBuilder")
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/diskStorage')

class DishImageController {

    async updateDishImage(request, response) {
        
        const dish_id = request.params.dish_id
        const dishImageFileName = request.file.filename

        const diskStorage = new DiskStorage()

        const dish = await knex('dishes')
        .where({ id: dish_id}).first()

        if(!dish) {
            throw new AppError("Dish not found.", 401)
        }

        if(dish.image) {
            await diskStorage.deleteFile(dish.image)
        }

        dish.image = await diskStorage.saveFile(dishImageFileName)

        await knex('dishes')
        .update({ image: dish.image })
        .where({ id: dish_id })

        return response.json(dish)
    }

}

module.exports = DishImageController