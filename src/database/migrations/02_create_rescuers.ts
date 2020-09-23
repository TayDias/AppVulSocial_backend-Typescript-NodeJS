import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('rescuer', table => {
        table.increments('id').primary()
        
        table.string('bio').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()

        table.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        table.integer('specialty_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('specialty')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('rescuer')
}