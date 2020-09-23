import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('assistance', table => {
        table.increments('id').primary()

        table.integer('protocol').notNullable()
        table.string('session_start').notNullable()
        table.string('session_end').notNullable()

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