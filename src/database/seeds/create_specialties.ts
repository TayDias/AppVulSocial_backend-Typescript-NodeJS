import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('specialty').insert([
        { name: 'Assistencia Social' },
        { name: 'Pedagogia' },
        { name: 'Psicologia' }
    ])
}

// npm run knex:seed