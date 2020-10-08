import { Request, Response } from 'express'
import knex from '../database/connection'

import convertHoursToMinutes from '../utils/convertHoursToMinutes'
import convertMinutesToHours from '../utils/convertMinutesToHours'

interface ScheduleItem {
    id: number,
    weekday: string,
    from: string,
    to: string
}
class ScheduleController {
    async show (request: Request, response: Response) {
        const { rescuer_id } = request.query

        let schedule = await knex('schedule')
            .where('schedule.rescuer_id', String(rescuer_id))
            .select('schedule.id AS id', 'schedule.week_day AS weekday', 'schedule.from AS from', 'schedule.to AS to')

        const rescuer_schedules = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                weekday: scheduleItem.weekday,
                from: convertMinutesToHours(Number(scheduleItem.from)),
                to: convertMinutesToHours(Number(scheduleItem.to)),
                rescuer_id
            }
        })

        return response.json(rescuer_schedules)
    }

    async update (request: Request, response: Response) {
        const {
            rescuer_id,
            schedules
        } = request.body

        const rescuer_schedules = schedules.map((scheduleItem: ScheduleItem) => {
            return {
                id: scheduleItem.id,
                week_day: scheduleItem.weekday,
                from: convertHoursToMinutes(scheduleItem.from),
                to: convertHoursToMinutes(scheduleItem.to),
                rescuer_id
            }
        })

        //UPDATE NA TABELA SCHEDULE
        try {  
            knex.transaction(trx => {
                const queries = rescuer_schedules.map((schedule: any) => knex('schedule')
                    .where('id', schedule.id)
                    .update(schedule)
                    .transacting(trx)
                )
                Promise.all(queries)
                    .then(trx.commit)    
                    .catch(trx.rollback);
            })

        } catch(e) {
            console.log('Falha ao realizar update dos horários.')
        }

        return response.json({
            rescuer_schedules
        })

    }
}

export default ScheduleController