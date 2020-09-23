import { Request, Response } from 'express'
import knex from '../database/connection'

class ScheduleController {
    async index (request: Request, response: Response) {
        const { rescuer_id } = request.query

        const specialties = await knex('schedule')
        .where('schedule.rescuer_id', String(rescuer_id))
        .select('*')

        return response.json(specialties)
    }
}

export default ScheduleController