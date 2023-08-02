exports.up = async function(knex) {

    await knex.schema.createTable( 'dishes', table => {
  
      table.increments('id').primary()
  
      table.text('name').notNullable()
      table.text('description').notNullable()
      table.text('price').notNullable()

      table.text('image').notNullable()
      
      table.timestamp('created_at').default(knex.fn.now())
      table.timestamp('updated_at').default(knex.fn.now())

      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
  
    })
  
  };
  
  exports.down = function(knex) {
      knex.schema.dropTable('users');
  };
  