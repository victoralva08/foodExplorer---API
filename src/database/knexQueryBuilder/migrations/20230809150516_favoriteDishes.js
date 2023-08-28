exports.up = async function(knex) {

    await knex.schema.createTable( 'favoriteDishes', table => {
  
      table.text('dish_id').references('id').inTable('dishes').onDelete('CASCADE')

      table.text('dishName').notNullable()
      table.text('dishCategory').notNullable()
      table.text('dishPrice').notNullable()
      table.text('dishImage').notNullable()
      
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
      
      table.timestamp('updated_at').default(knex.fn.now())
  
    })
  
  };
  
  exports.down = function(knex) {
      knex.schema.dropTable('favoriteDishes');
  };
  