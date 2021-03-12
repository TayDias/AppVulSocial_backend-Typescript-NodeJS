import { Request, Response } from 'express'
import knex from '../database/connection'
import { randomBytes } from 'crypto'

import { dec, decPass, enc, encPass } from '../utils/cryptoUtils'
import sendAccessKey from '../utils/emailUtils'
import { sendFeedback } from '../utils/emailUtils'

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

        const prev_address = address

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

        //Envio por e-mail da chave de acesso
        sendAccessKey(prev_address, access_key)

        return response.json({
            user_id,
            ...user,
            vulnerable
        })
    }

    async sendFeedback (request: Request, response: Response) {
        const { 
            autor,
            motivo,
            feedback
        } = request.body

        //Envio do schedule
        sendFeedback(autor, motivo, feedback)

        return response.status(200).json({ message: 'Email enviado!'})
    }
}

export default VulnerableController