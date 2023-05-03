import Knex from 'knex'

//migrations = controlam as versões do banco de dados

export async function up(knex: Knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary()

        table.string('name').notNullable()
        table.string('phone').notNullable()
        table.string('type').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user')
}

// npm run knex:migrate