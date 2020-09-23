import { Request, Response } from 'express'
import knex from '../database/connection'

class SpecialtyController {
    async index (request: Request, response: Response) {
        const specialties = await knex('specialty').select('*')

        return response.json(specialties)
    }
}

//Cadastro de Especialidades - Futuramente

export default SpecialtyController