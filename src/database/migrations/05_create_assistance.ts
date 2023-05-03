import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('assistance', table => {
        table.increments('id').primary()

        table.integer('protocol').notNullable()
        table.integer('status').notNullable()
        table.string('accessLink').notNullable()
        table.string('session_start')
        table.string('session_end')
        table.string('preview')

        table.integer('rescuer_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('rescuer')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        table.integer('vulnerable_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('vulnerable')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('assistance')
}