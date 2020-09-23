import { Request, Response } from 'express'
import knex from '../database/connection'
import { randomBytes } from 'crypto'

class VulnerableController {
    async index (request: Request, response: Response) {
        const vulnerable = await knex('vulnerable')
            .join('user', 'user.id', '=', 'vulnerable.user_id')
            .select('*')

        return response.json(vulnerable)
    }

    async create (request: Request, response: Response) {    
        const {
            name,
            phone,
            nickname,
            address         
        } = request.body

        const type = ('Vulnerável').toString()
        const access_key = randomBytes(3).toString('hex')

        const user = {
            name,
            phone,
            type
        }

        //Transação para garantir execução conjunta dos inserts
        const transaction = await knex.transaction()

        //Insersão + Retorno dos ids inseridos
        const insertedIds = await transaction('user').insert(user)
    
        //Pegar o id na posição 0
        const user_id = insertedIds[0]

        const vulnerable = {
            nickname,
            address,
            access_key,
            user_id
        }

        //Inserção na Subtabela
        await transaction('vulnerable').insert(vulnerable)
    
        //Commit da alteração
        await transaction.commit()

        return response.json({
            user_id,
            ...user,
            vulnerable
        })
    }
}

export default VulnerableController