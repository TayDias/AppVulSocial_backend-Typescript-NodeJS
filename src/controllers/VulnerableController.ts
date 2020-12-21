import { Request, Response } from 'express'
import knex from '../database/connection'
import { randomBytes } from 'crypto'

import { dec, decPass, enc, encPass } from '../utils/cryptoUtils'
class VulnerableController {
    async index (request: Request, response: Response) {
        const vulnerable = await knex('vulnerable')
            .join('user', 'user.id', '=', 'vulnerable.user_id')
            .select('user.*', 'vulnerable.*')

        return response.json(vulnerable)
    }

    async create (request: Request, response: Response) {    
        let {
            name,
            phone,
            nickname,
            address         
        } = request.body

        const type = ('Vulnerável').toString()

        let access_key = randomBytes(3).toString('hex')

        //Encriptação de dados sensíveis - LGPD
        access_key = encPass(access_key).toString()
        name = enc(name)
        phone = enc(phone)
        address = enc(address)

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

        //Desncriptação de dados para retorno - LGPD
        access_key = decPass(access_key).toString()

        return response.json({
            user_id,
            ...user,
            vulnerable
        })
    }
}

export default VulnerableController