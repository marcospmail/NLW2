import { Request, Response } from 'express'
import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}


export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query

    console.log(filters)

    const week_day = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    if (!week_day || !subject || !time) {
      return response.status(400).json({ error: 'missing query filters' })
    }

    const timeInMinutes = convertHourToMinutes(time)

    const schedule = await db('classes')
    .where('classes.subject', '=', subject)
    .join('users', 'classes.user_id', '=', 'users.id')
    .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
    .select(['classes.*', 'users.*', 'class_schedule.*'])
    .whereExists(function () {
      this.select('class_schedule.*')
        .from('class_schedule')
        .whereRaw('`class_schedule`.`week_day` = ?', [week_day])
        .whereRaw('`class_schedule`.`from` <= ?', [timeInMinutes])
        .whereRaw('`class_schedule`.`to` > ?', [timeInMinutes])
        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
    })
    
    return response.json(schedule)
  }

  async create(request: Request, response: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body

    const trx = await db.transaction()

    try {

      const  [user] = await trx('users').where({ name })

      let user_id = user ? user.id : null

      if (!user_id) {
        [user_id] = await trx('users').insert({
          name,
          avatar,
          whatsapp,
          bio
        })
      }

      const [class_id] = await trx('classes').insert({
        user_id,
        subject,
        cost
      })



      const classSchedule = schedule.map((s: ScheduleItem) => {
        return {
          class_id,
          week_day: s.week_day,
          from: convertHourToMinutes(s.from),
          to: convertHourToMinutes(s.to),
        }
      })

      await trx('class_schedule').insert(classSchedule)

      await trx.commit()

      return response.status(201).send()

    } catch (err) {
      console.log('errorrrr', err)

      trx.rollback()

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }

  }
}