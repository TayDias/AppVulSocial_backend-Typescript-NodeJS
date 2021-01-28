import { Request, Response } from 'express'
import knex from '../database/connection'
import { randomBytes } from 'crypto'

import getDateTime from '../utils/dateTimeUtils'
import checkRescuerAvailability from './Rescuer/checkRescuerAvailability'
import selectAssistanceRescuer from '../utils/selectAssistanceRescuer'

class AssistanceController {
    async index (request: Request, response: Response) {
        const assistance = await knex('assistance')
            .join('vulnerable', 'vulnerable.id', '=', 'assistance.vulnerable_id')
            .join('user', 'user.id', '=', 'vulnerable.user_id')
            .join('rescuer', 'rescuer.id', '=', 'assistance.rescuer_id')
            .distinct()
            .select(
                'assistance.id as id', 'assistance.protocol as protocol',
                'assistance.status as status', 'assistance.preview as preview',
                'assistance.accessLink as accessLink', 'vulnerable.id as vulnerable_id',
                'vulnerable.nickname as vulnerable_nickname', 'user.name as vulnerable_fullname'
                )
            .where('assistance.status', '<>', '2')

        return response.json(assistance)
    }

    async show (request: Request, response: Response) {
        const { rescuer_id } = request.params

        const assistance = await knex('assistance')
            .join('rescuer', 'rescuer.id', '=', 'assistance.rescuer_id')
            .join('vulnerable', 'vulnerable.id', '=', 'assistance.vulnerable_id')
            .distinct()
            .select('assistance.*', 'rescuer.*', 'vulnerable.*')
            .where('rescuer.id', '=', String(rescuer_id))
            .where('assistance.status', '<>', '2')
            .first()

        if(!assistance) {
            return response.status(400).json({ message: 'Not found.'})
        }
    
        return response.json(assistance)
    }

    async create (request: Request, response: Response) {
        const {
            preview,
            vulnerable_id,        
        } = request.body

        //Gerar Protocolo do atendimento
        const protocol = randomBytes(4).readUIntBE(0,3)
        const status = 0    //Aberto
        
        //Listar  os atendentes disponíveis no horário - Apenas listar por enquanto
        const avaliableRescuers = await checkRescuerAvailability()

        //Sortear atendente
        if(avaliableRescuers.length === 0) {
            return response.status(400).json({ message: 'No available rescuers.'})
        }

        const rescuer_id = await selectAssistanceRescuer(avaliableRescuers)
        
        //Gerar Link de acesso ao chat ... falta fazer o chat

        //Criar Atendimento
        const assistance = {
            protocol,
            status,
            preview,
            vulnerable_id,
            rescuer_id,
        }

        //INSERT
        await knex('assistance').insert(assistance)

        return response.json({
            assistance
        })
    }

    async update (request: Request, response: Response) {
        const { 
            action,
            assistance_id
        } = request.body

        let assistance

        if(action === "enter"){
            const status = 1  //Andamento
            const session_start = getDateTime()

            assistance = {
                status,
                session_start,
            }

            //UPDATE
            await knex('assistance').where('id', '=', String(assistance_id)).update(assistance)

            return response.json({
                assistance
            })

        }

        else if (action === "exit") {
            const status = 2  //Encerrado
            const session_end = getDateTime()

            assistance = {
                status,
                session_end,
            }

            //UPDATE
            await knex('assistance').where('id', '=', String(assistance_id)).update(assistance)

            return response.json({
                assistance
            })

        }

        else {
            response.status(400).json({ message: 'Unrecognized update option.'})
        }

    }
}

export default AssistanceController