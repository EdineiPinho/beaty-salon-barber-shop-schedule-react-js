import { NextFunction, Request, Response } from "express";
import { ShcedulesServices } from "../services/SchedulesServices";

class SchedulesController {
  private schedulesServices: ShcedulesServices
  constructor() {
    this.schedulesServices = new ShcedulesServices
  }
  async store(request: Request, response: Response, next: NextFunction) {
    const { name, phone, date } = request.body;
    try {
      const result = await this.schedulesServices.create({ name, phone, date })
      return response.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export { SchedulesController } 