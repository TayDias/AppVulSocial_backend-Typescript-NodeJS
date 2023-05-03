import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('vulnerable', table => {
        table.increments('id').primary()
        table.string('nickname').notNullable()
        table.string('address').notNullable()
        table.string('access_key').notNullable()

        table.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('vulnerable')
}