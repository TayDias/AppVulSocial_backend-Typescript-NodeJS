import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('schedule', table => {
        table.increments('id').primary()

        table.string('week_day').notNullable()
        table.integer('from').notNullable()
        table.integer('to').notNullable()

        table.integer('rescuer_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('rescuer')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('schedule')
}