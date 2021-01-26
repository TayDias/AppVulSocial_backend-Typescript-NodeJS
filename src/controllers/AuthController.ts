import { Request, Response } from 'express'
import knex from '../database/connection'
import * as JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

import { decPass, dec } from '../utils/cryptoUtils'

dotenv.config()

class AuthController {
    async login (request: Request, response: Response) {
        const {
            email,
            password,
        } = request.body

        const rescuers = await knex('rescuer')
            .join('user', 'user.id', '=', 'rescuer.user_id')
            .distinct()
            .select('rescuer.email AS email', 'rescuer.password AS password', 'rescuer.id AS id')

        const vulnerable = await knex('vulnerable')
            .join('user', 'user.id', '=', 'vulnerable.user_id')
            .distinct()
            .select('vulnerable.address AS email', 'vulnerable.access_key AS password', 'vulnerable.id AS id')

        
        //Para Vulneráveis
        for await (const vul of vulnerable) {            
            const decryptedPass = decPass(vul.password).toString()
            const decryptedEmail = dec(vul.email).toString()

            if((email === decryptedEmail) && (password === decryptedPass)) {
                const id = vul.id

                const token = JWT.sign({ id }, (process.env.SECRET+''), {
                    expiresIn: 900 // expires in 15min
                })

                return response.json({ auth: true, token: token, id: vul.id, isRescuer: false })
            }
        }

        //Para Atendentes
        for await (const rescuer of rescuers) {            
            const decryptedPass = decPass(rescuer.password).toString()
            const decryptedEmail = dec(rescuer.email).toString()

            if((email === decryptedEmail) && (password === decryptedPass)) {
                const id = rescuer.id

                const token = JWT.sign({ id }, (process.env.SECRET+''), {
                    expiresIn: 900 // expires in 15min
                })

                return response.json({ auth: true, token: token, id: rescuer.id, isRescuer: true })
            }
        }

        return response.status(400).json({ message: 'Falha de Login, o usuário com as credenciais informadas não foi encontrado.'})
    }
}

export default AuthController