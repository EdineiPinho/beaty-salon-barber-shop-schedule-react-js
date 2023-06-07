import { ICreate } from "../interfaces/SchedulesInterface";
import { getHours, isBefore, startOfHour } from "date-fns"
import { SchedulesRepository } from "../respositories/ServicesRepository";

class ShcedulesServices {
  private schedulesRespositoy: SchedulesRepository
  constructor() {
    this.schedulesRespositoy = new SchedulesRepository()
  }
  async create({ name, phone, date, user_id }: ICreate) {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)

    const hour = getHours(hourStart)
    if (hour <= 9 || hour >= 19) {
      throw new Error('Create Schedule between 9 and 19.')
    }

    if (isBefore(hourStart, new Date())) {
      throw new Error("Isn't allowed to schedule old date")
    }
    const checkIsAvailable = await this.schedulesRespositoy.find(hourStart, user_id)
    if (checkIsAvailable) {
      throw new Error('Schedule data is not available')
    }
    const create = await this.schedulesRespositoy.create({
      name,
      phone,
      date: hourStart,
      user_id,
    })
    return create
  }

  async index(date: Date) {
    const result = await this.schedulesRespositoy.findAll(date)
    console.log('RSchedulesServices/index = ', result)
    return result
  }

  async update(id: string, date: Date, user_id: string) {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)
    if (isBefore(hourStart, new Date())) {
      throw new Error("Isn't allowed to schedule old date")
    }
    const checkIsAvailable = await this.schedulesRespositoy.find(hourStart, user_id)
    if (checkIsAvailable) {
      throw new Error('Schedule data is not available')
    }
    const result = await this.schedulesRespositoy.update(id, date)
    return result
  }
}

export { ShcedulesServices }