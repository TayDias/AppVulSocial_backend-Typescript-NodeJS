import knex from 'knex'
//import path from 'path'

require('dotenv').config()

//Production
/*
const connection = knex({
  client: 'mysql',
  connection: {
      host : process.env.API_HOST,
      user : process.env.API_USER,
      password : process.env.API_ACCESS_KEY,
      database : process.env.API_NAME,
      port: 3306
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/database/migrations'  // <-- here
    },
    seeds: {
      directory: './src/database/seeds'
    },
    useNullAsDefault: true     
})
*/

// Dev
//MySql 
const connection = knex({
    client: 'mysql',
    connection: {
        host : process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_ACCESS_KEY,
        database : process.env.DATABASE_NAME,
        port: 3305
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'migrations',
        directory: './src/database/migrations'
      },
      seeds: {
        directory: './src/database/seeds'
      },
      useNullAsDefault: true     
})

// Sqlite
/*
const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true
})
*/

export default connection

// Executar para criar as migrations: 
// npm run knex:migrate