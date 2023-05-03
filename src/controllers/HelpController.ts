import { Request, Response } from 'express'
import knex from '../database/connection'

interface HelpItem {
    id: number,
    url: string,
    title: string,
    desc: string,
    text: string,
    location: string
}

class HelpController {
    async index (request: Request, response: Response) {
        const { location } = request.query

        let help = await knex('help')
            .select('help.id AS id', 'help.url AS url',
                    'help.title AS title', 'help.desc AS desc',
                    'help.text AS text', 'help.location AS location')
            .where('location', '=', String(location))
            .orderBy('id', 'asc')

        const HelpIts = help.map((helpItem: HelpItem) => {
            return {
                id: helpItem.id,
                url: helpItem.url,
                title: helpItem.title,
                desc: helpItem.desc,
                text: helpItem.text,
                location: helpItem.location
            }
        })

        return response.json(HelpIts)
    }
}

export default HelpController