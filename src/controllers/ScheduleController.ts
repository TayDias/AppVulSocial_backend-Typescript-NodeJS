import { Request, Response } from 'express'
import knex from '../database/connection'

import convertHoursToMinutes from '../utils/convertHoursToMinutes'
import convertMinutesToHours from '../utils/convertMinutesToHours'
import { getTime, getWeekday } from '../utils/dateTimeUtils'

interface ScheduleItem {
    id: number,
    weekday: string,
    from: string,
    to: string,
    weekdayname: string
}
class ScheduleController {
    async create (request: Request, response: Response) {
        const {
            rescuer_id,
            schedules
        } = request.body

        const rescuer_schedules = schedules.map((scheduleItem: ScheduleItem) => {
            return {
                week_day: scheduleItem.weekday,
                from: convertHoursToMinutes(scheduleItem.from),
                to: convertHoursToMinutes(scheduleItem.to),
                rescuer_id: rescuer_id
            }
        })

        await knex('schedule').insert(rescuer_schedules)

        return response.json({
            rescuer_schedules
        })
    }

    async show (request: Request, response: Response) {
        const { rescuer_id } = request.query

        let schedule = await knex('schedule')
            .where('schedule.rescuer_id', '=', String(rescuer_id))
            .select('schedule.id AS id', 'schedule.week_day AS weekday', 'schedule.from AS from', 'schedule.to AS to')

        const rescuer_schedules = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                id: scheduleItem.id,
                weekday: scheduleItem.weekday,
                from: convertMinutesToHours(Number(scheduleItem.from)),
                to: convertMinutesToHours(Number(scheduleItem.to)),
                action: 1
            }
        })

        return response.json(rescuer_schedules)
    }

    async showNextDates (request: Request, response: Response) {
        const actualDate = getTime()
        const day = getWeekday()
        const minutesActualDate = convertHoursToMinutes(actualDate)

        const schedule_actualweek = await knex('schedule')
            .join('weekday', 'weekday.id', '=', 'schedule.week_day')
            .where('schedule.week_day', '>', String(day))
                .orWhere('schedule.week_day', '=', String(day)).andWhere('schedule.from', '>', String(minutesActualDate))
            .select('schedule.id AS id', 'schedule.week_day AS weekday', 'schedule.from AS from', 'weekday.name AS weekdayname')
            .orderBy('weekday', 'from')

        const schedule_nextweek = await knex('schedule')
            .join('weekday', 'weekday.id', '=', 'schedule.week_day')
            .where('schedule.week_day', '<', String(day))
                .orWhere('schedule.week_day', '=', String(day)).andWhere('schedule.from', '<', String(minutesActualDate))
            .select('schedule.id AS id', 'schedule.week_day AS weekday', 'schedule.from AS from', 'weekday.name AS weekdayname')
            .orderBy('weekday', 'from')

        const schedule = schedule_actualweek.concat(schedule_nextweek)

        const schedules = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                id: scheduleItem.id,
                weekday: scheduleItem.weekday,
                weekday_name: scheduleItem.weekdayname,
                from: convertMinutesToHours(Number(scheduleItem.from)),
            }
        })

        return response.json(schedules)
    }

    async checkAvailability (request: Request, response: Response) {
        const actualDate = getTime()
        const day = getWeekday()
        const minutesActualDate = convertHoursToMinutes(actualDate)

        const schedule = await knex('schedule')
            .join('weekday', 'weekday.id', '=', 'schedule.week_day')
            .where('schedule.week_day', '=', String(day))
            .andWhere('schedule.from', '<=', String(minutesActualDate)).andWhere('schedule.to', '>', String(minutesActualDate))

        if(schedule[0]) {
            return response.json(true)
        }

        return response.json(false)
    }

    async update (request: Request, response: Response) {
        const {
            rescuer_id,
            schedules
        } = request.body

        const rescuer_schedules = schedules.map((scheduleItem: ScheduleItem) => {
            if(scheduleItem.id >= 0){
                return {
                    id: scheduleItem.id,
                    week_day: scheduleItem.weekday,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to)
                }
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