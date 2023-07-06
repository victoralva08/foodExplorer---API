exports.up = async function(knex) {

    await knex.schema.createTable( 'prices', table => {


    table.increments('id').primary()
    table.text('price').notNullable()

    table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
    table.timestamp('created_at').default(knex.fn.now());

    })

}

exports.down = function(knex) {

knex.schema.dropTable('prices');

};
