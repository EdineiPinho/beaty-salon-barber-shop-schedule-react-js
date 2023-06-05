import { ICreate } from "../interfaces/SchedulesInterface";
import { isBefore, startOfHour } from "date-fns"
import { SchedulesRepository } from "../respositories/ServicesRepository";

class ShcedulesServices {
  private schedulesRespositoy: SchedulesRepository
  constructor() {
    this.schedulesRespositoy = new SchedulesRepository()
  }
  async create({ name, phone, date }: ICreate) {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)
    if (isBefore(hourStart, new Date())) {
      throw new Error("Isn't allowed to schedule old date")
    }
    const checkIsAvailable = await this.schedulesRespositoy.find(hourStart)
    if (checkIsAvailable) {
      throw new Error('Schedule data is not available')
    }
    const create = await this.schedulesRespositoy.create({
      name,
      phone,
      date: hourStart,
    })
    return create
  }

  async index(date: Date) {
    const result = await this.schedulesRespositoy.findAll(date)
    console.log('RSchedulesServices/index = ', result)
    return result
  }

  async update(id: string, date: Date) {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)
    if (isBefore(hourStart, new Date())) {
      throw new Error('It is not allowed to schedule old date')
    }
    const checkIsAvailable = await this.schedulesRespositoy.find(hourStart)
    if (checkIsAvailable) {
      throw new Error('Schedule date is not available')
    }
    const result = await this.schedulesRespositoy.update(id, date)
    return result
  }
}

export { ShcedulesServices }