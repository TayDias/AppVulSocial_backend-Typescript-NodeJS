import { Request, Response } from 'express'
import knex from '../database/connection'
import * as JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

import { AES, enc } from 'crypto-ts'

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


        for await (const rescuer of rescuers) {            
            const decryptedPass = AES.decrypt((rescuer.password).toString(), (process.env.ENCRYPTION_KEY+''))
            const decryptedPassOutPut = decryptedPass.toString(enc.Utf8)

            if((email === rescuer.email) && (password === decryptedPassOutPut)) {
                const id = rescuer.id

                const token = JWT.sign({ id }, (process.env.SECRET+''), {
                    expiresIn: 900 // expires in 15min
                })

                return response.json({ auth: true, token: token, id: rescuer.id })
            }
        }

        return response.status(400).json({ message: 'Falha de Login, o usuário com as credenciais informadas não foi encontrado.'})
    }
}

export default AuthController