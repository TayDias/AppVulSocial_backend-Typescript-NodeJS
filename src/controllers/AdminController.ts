import { Request, Response } from 'express'
import knex from '../database/connection'
import { decPass, dec } from '../utils/cryptoUtils'

interface AdminItem {
    id: number,
    name: String,
    type: String,
    avaliable: number,
    phone: String,
    email: String,
    bio: String,
    password: String,
}

class AdminController {
    async index(request: Request, response: Response) {

        let rescuer = await knex('rescuer')
            .join('user', 'user.id', '=', 'rescuer.user_id')
            .distinct()
            .select(
                'user.name AS name', 'user.type AS type',
                'rescuer.email AS email', 'rescuer.bio AS bio',
                'rescuer.available AS available', 'rescuer.password AS password',
                'rescuer.id AS id')

        const AdminIts = rescuer.map((AdminItem: AdminItem) => {
            return {
                id: AdminItem.id,
                name: AdminItem.name,
                type: AdminItem.type,
                avaliable: AdminItem.avaliable,
                phone: AdminItem.phone,
                email: AdminItem.email,
                bio: AdminItem.bio,
                password: AdminItem.password,
            }
        })

        return response.json(AdminIts)
    }

    async search(request: Request, response: Response) {
        const { id } = request.params

        let rescuer = await knex('rescuer')
            .join('user', 'user.id', '=', 'rescuer.user_id')
            .select(
                'user.name as name', 'user.type as type',
                'rescuer.email as email', 'rescuer.bio as bio',
                'rescuer.available as available', 'rescuer.password AS password',
                'rescuer.user_id AS user_id'
            )
            .where('rescuer.id', '=', String(id))
            .first()

        const AdminIts = rescuer.map((AdminItem: AdminItem) => {
            return {
                id: AdminItem.id,
                name: AdminItem.name,
                type: AdminItem.type,
                avaliable: AdminItem.avaliable,
                phone: AdminItem.phone,
                email: AdminItem.email,
                bio: AdminItem.bio,
                password: AdminItem.password,
            }
        })

        return response.json(AdminIts)
    }
}

export default AdminController