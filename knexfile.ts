import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        },
        useNullAsDefault: true
    },
    
    development2: {
        client: 'mysql',
        debug: true,
        connection: {
            host : process.env.DATABASE_HOST,
            user : process.env.DATABASE_USER,
            password : process.env.DATABASE_ACCESS_KEY,
            database : process.env.DATABASE_NAME,
            port: '3305'
        },  
        migrations: {
          directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
          directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        }
    },

    production: {
        client: 'mysql',
        debug: true,
        connection: {
            host : process.env.API_HOST,
            user : process.env.API_USER,
            password : process.env.API_ACCESS_KEY,
            database : process.env.API_NAME,
            port: '3306'
        },  
        migrations: {
          directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
          directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        }
    }
    
}

// Visualizar Database no explorer ao lado:
// Instalar extensão: Sqlite
// Ctrl + Shift + P
// Open database + nomedatabese