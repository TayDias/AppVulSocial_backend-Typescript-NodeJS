import { Request, Response } from 'express'
import knex from '../database/connection'
import { dec } from '../utils/cryptoUtils'

interface AdminItem {
    id: number,
    name: String,
    type: String,
    available: number,
    phone: String,
    email: String,
    bio: String,
    password: String,
}

class AdminController {
    async index(request: Request, response: Response) {
        const { id } = request.params

        let rescuer = await knex('rescuer')
            .join('user', 'user.id', '=', 'rescuer.user_id')
            .distinct()
            .select(
                'user.name AS name', 'user.type AS type',
                'rescuer.email AS email', 'rescuer.bio AS bio',
                'rescuer.available AS available', 'rescuer.password AS password',
                'rescuer.id AS id', 'user.phone AS phone')
            .where('rescuer.id', '!=', String(id))

        const AdminIts = rescuer.map((AdminItem: AdminItem) => {
            return {
                id: AdminItem.id,
                name: dec(AdminItem.name).toString(),
                type: AdminItem.type,
                available: AdminItem.available,
                phone: dec(AdminItem.phone).toString(),
                email: dec(AdminItem.email).toString(),
                bio: AdminItem.bio,
                password: dec(AdminItem.password).toString(),
            }
        })

        return response.json(AdminIts)
    }

    async search(request: Request, response: Response) {
        const { id } = request.params

        let rescuer = await knex('rescuer')
            .join('user', 'user.id', '=', 'rescuer.user_id')
            .distinct()
            .select(
                'user.name AS name', 'user.type AS type',
                'rescuer.email AS email', 'rescuer.bio AS bio',
                'rescuer.available AS available', 'rescuer.password AS password',
                'rescuer.id AS id', 'user.phone AS phone')
            .where('rescuer.id', '=', String(id))

        const AdminIts = rescuer.map((AdminItem: AdminItem) => {
            return {
                id: AdminItem.id,
                name: dec(AdminItem.name).toString(),
                type: AdminItem.type,
                available: AdminItem.available,
                phone: dec(AdminItem.phone).toString(),
                email: dec(AdminItem.email).toString(),
                bio: AdminItem.bio
            }
        })

        return response.json(AdminIts)
    }

    async delete(request: Request, response: Response) {
        let { id } = request.query

        try {
            knex.transaction(trx => {
                knex('user')
                    .transacting(trx)
                    .delete()
                    .where({ 'id': id })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })

            knex.transaction(trx => {
                knex('rescuer')
                    .transacting(trx)
                    .delete()
                    .where({ 'user_id': id })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })

            knex.transaction(trx => {
                knex('schedule')
                    .transacting(trx)
                    .delete()
                    .where({ 'rescuer_id': id })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })

        } catch (e) {
            return response.status(400).json({ message: 'Falha ao realizar delete do usuário.' })
        }


        return response.status(200).json({ message: 'Usuário deletado com sucesso' })
    }
}

export default AdminController