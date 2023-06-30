exports.up = async function(knex) {

    await knex.schema.createTable( 'ingredients', table => {
  
      table.increments('id').primary()
  
      table.text('name').notNullable()
      
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE')
      
    })
  
  };
  
  exports.down = function(knex) {
      knex.schema.dropTable('users');
  };
  