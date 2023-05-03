import knex from '../../database/connection'

import { getTime, getWeekday } from '../../utils/dateTimeUtils'
import convertHoursToMinutes from '../../utils/convertHoursToMinutes'

export default async function getNextSchedules() {
    const actualDate = getTime()
    const day = getWeekday()
    const minutesActualDate = convertHoursToMinutes(actualDate)

    const schedule_actualweek = await knex('schedule')
        .join('weekday', 'weekday.id_prod', '=', 'schedule.week_day')
        .join('rescuer', 'rescuer.id', '=', 'schedule.rescuer_id')
        .where('rescuer.available', '=', '1')
        .where('schedule.week_day', '>', String(day))
            .orWhere('schedule.week_day', '=', String(day)).andWhere('schedule.from', '>', String(minutesActualDate))
        .select('schedule.id AS id', 'schedule.week_day AS weekday', 'schedule.from AS from', 'weekday.name AS weekdayname')
        .orderBy('weekday', 'from')
        .limit(3)

    let count = schedule_actualweek.length;

    const schedule_nextweek = await knex('schedule')
        .join('weekday', 'weekday.id_prod', '=', 'schedule.week_day')
        .join('rescuer', 'rescuer.id', '=', 'schedule.rescuer_id')
        .where('rescuer.available', '=', '1')
        .where('schedule.week_day', '<', String(day))
            .orWhere('schedule.week_day', '=', String(day)).andWhere('schedule.from', '<', String(minutesActualDate))
        .select('schedule.id AS id', 'schedule.week_day AS weekday', 'schedule.from AS from', 'weekday.name AS weekdayname')
        .orderBy('weekday', 'from')
        .limit(3-count)

    const schedule = schedule_actualweek.concat(schedule_nextweek)
    
    return schedule
}