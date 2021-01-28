import knex from '../../database/connection'

export default async function checkRescuerAvailability() {
    const rescuers = await knex('rescuer')
            .join('specialty', 'specialty.id', '=', 'rescuer.specialty_id')
            .join('schedule', 'schedule.rescuer_id', '=', 'rescuer.id')
            .where('rescuer.available', '=', '1')
            .distinct()
            .select('rescuer.id AS rescuer_id', 'specialty.id AS specialty_id')

    return rescuers
}