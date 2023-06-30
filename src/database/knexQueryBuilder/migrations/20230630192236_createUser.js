exports.up = async function(knex) {

        await knex.schema.createTable( 'users', table => {

        table.boolean("isAdmin").default(0)
        table.increments('id').primary()

        table.text('name').notNullable()
        table.text('email').notNullable()
        table.text('password').notNullable()

        table.timestamp('created_at').default(knex.fn.now());
        table.timestamp('updated_at').default(knex.fn.now());

        })

    }


exports.down = function(knex) {
    knex.schema.dropTable('users');
};
