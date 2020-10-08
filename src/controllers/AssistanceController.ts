import { Request, Response } from 'express'
import knex from '../database/connection'

class AssistanceController {
    async index (request: Request, response: Response) {
        const assistance = await knex('assistance')
            .join('rescuer', 'rescuer.id', '=', 'assistance.rescuer_id')
            .join('vulnerable', 'vulnerable.id', '=', 'assistance.vulnerable_id')
            .distinct()
            .select('assistance.*', 'rescuer.*', 'vulnerable.*')

        return response.json(assistance)
    }

    async show (request: Request, response: Response) {
        const { rescuer_id } = request.params

        const assistance = await knex('assistance')
            .join('rescuer', 'rescuer.id', '=', 'assistance.rescuer_id')
            .join('vulnerable', 'vulnerable.id', '=', 'assistance.vulnerable_id')
            .distinct()
            .select('assistance.*', 'rescuer.*', 'vulnerable.*')
            .where('rescuer.id', String(rescuer_id))
            .first()

        if(!assistance) {
            return response.status(400).json({ message: 'Rescuer not found.'})
        }
    
        return response.json(assistance)
    }

    async create (request: Request, response: Response) {
        //Gerar Protocolo
        //Verificar os atendentes disponíveis no horário
        //Sortear atendente

        //Criar Atendimento
    }

    async update (request: Request, response: Response) {
        //Atualizar atendimento (DataInicio e/ou DataFim)
    }
}

export default AssistanceController