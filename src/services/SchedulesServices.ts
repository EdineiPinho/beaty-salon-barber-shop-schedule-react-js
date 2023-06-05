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

    console.log('Data antes: ', dateFormatted);

    const hourStart = startOfHour(dateFormatted)
    console.log('Data depois: ', hourStart);
    if (isBefore(hourStart, new Date())) {
      throw new Error("Isn't allowed to schedule old date")
    }

    const checkIsAvailable = await this.schedulesRespositoy.find(hourStart)

    if (checkIsAvailable) {
      throw new Error('Schedule data is not available')
    }
    const create = await this.schedulesRespositoy.create({ name, phone, date: hourStart })
  }
}

export { ShcedulesServices }