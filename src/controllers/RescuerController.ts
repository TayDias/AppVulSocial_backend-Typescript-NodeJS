import { Request, Response } from 'express'
import knex from '../database/connection'

import { AES } from 'crypto-ts'
import convertHoursToMinutes from '../utils/convertHoursToMinutes'

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
        const { id } = request.params;

        const rescuer = await knex('rescuer')
            .join('user', 'user.id', '=', 'rescuer.user_id')
            .join('specialty', 'specialty.id', '=', 'rescuer.specialty_id')
            .join('schedule', 'schedule.rescuer_id', '=', 'rescuer.id')
            .distinct()
            .select('user.*', 'rescuer.*', 'specialty.name AS specialty_name')
            .where('rescuer.id', String(id))
            .first()
        
        if(!rescuer) {
            return response.status(400).json({ message: 'Rescuer not found.'})
        }

        return response.json(rescuer)
    }

    async create (request: Request, response: Response) {
        const {
            name,
            phone,
            bio,
            email,
            specialty_id,
            schedules
        } = request.body

        let { password } = request.body

        const type = ('Atendente').toString()
        const available = 1

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

        //Encriptar password
        const encryptedPass = AES.encrypt(password, (process.env.ENCRYPTION_KEY+'')).toString()
        password = encryptedPass

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