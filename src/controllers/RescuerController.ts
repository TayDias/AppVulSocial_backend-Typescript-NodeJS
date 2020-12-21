import { Request, Response } from 'express'
import knex from '../database/connection'

import convertHoursToMinutes from '../utils/convertHoursToMinutes'

import { dec, enc, encPass } from '../utils/cryptoUtils'

interface ScheduleItem {
    weekday: string,
    from: string,
    to: string
}

class RescuerController {
    async index(request: Request, response: Response) {
        const rescuers = await knex('rescuer')
            .join('user', 'user.id', '=', 'rescuer.user_id')
            .join('specialty', 'specialty.id', '=', 'rescuer.specialty_id')
            .join('schedule', 'schedule.rescuer_id', '=', 'rescuer.id')
            .distinct()
            .select('user.*', 'rescuer.*', 'specialty.name AS specialty_name')

        return response.json(rescuers)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        let rescuer = await knex('rescuer')
            .join('user', 'user.id', '=', 'rescuer.user_id')
            .join('specialty', 'specialty.id', '=', 'rescuer.specialty_id')
            .select(
                'user.name as name', 'user.type as type', 
                'rescuer.email as email','rescuer.bio as bio',
                'rescuer.available as available','specialty.name AS specialty'
                )
            .where('rescuer.id', '=', String(id))
            .first()
        
        if(!rescuer) {
            return response.status(404).json({ message: 'Rescuer not found.'})
        }

        //Desencriptação dos dados
        rescuer.name = dec(rescuer.name).toString()
        rescuer.email = dec(rescuer.email).toString()

        return response.json(rescuer)
    }

    async create (request: Request, response: Response) {
        const {
            bio,
            specialty_id,
            schedules
        } = request.body

        let { 
            name, 
            phone, 
            password, 
            email 
        } = request.body

        const type = ('Atendente').toString()
        const available = 1

        //Encriptação de dados sensíveis - LGPD
        password = encPass(password).toString()
        name = enc(name)
        phone = enc(phone)
        email = enc(email)

        const user = {
            name,
            phone,
            type
        }

        //INICIO DA TRANSAÇÃO
        const transaction = await knex.transaction()

        //INSERT NA TABELA USER
        const insertedUserIds = await transaction('user').insert(user)
        const user_id = insertedUserIds[0]

        const rescuer = {
            bio,
            email,
            password,
            available,
            specialty_id,
            user_id
        }

        //INSERT NA TABELA RESCUER
        const insertedRescuerIds = await transaction('rescuer').insert(rescuer)
        const rescuer_id = insertedRescuerIds[0]

        const rescuer_schedules = schedules.map((scheduleItem: ScheduleItem) => {
            return {
                week_day: scheduleItem.weekday,
                from: convertHoursToMinutes(scheduleItem.from),
                to: convertHoursToMinutes(scheduleItem.to),
                rescuer_id
            }
        })

        //INSERT NA TABELA SCHEDULE
        await transaction('schedule').insert(rescuer_schedules)

        //FIM DA TRANSAÇÃO
        await transaction.commit()

        return response.json({
            user_id,
            ...user,
            rescuer,
            rescuer_schedules
        })

    }

    async update (request: Request, response: Response) {
        const { 
            action, 
            available, 
            rescuer_id 
        } = request.body

        if(action === "available"){

            if(available === '0') {
                await knex('rescuer')
                    .where('id', '=', String(rescuer_id))
                    .update({
                        available: 0
                    })
            }
            else {
                await knex('rescuer')
                    .where('id', '=', String(rescuer_id))
                    .update({
                        available: 1
                    })
            }
            return response.status(200).json({ message: 'Updated availability status.'})
        }

        response.status(400).json({ message: 'Unrecognized update option.'})
    }
}

export default RescuerController