import { NextFunction, Request, Response } from 'express'
import { paymentServices } from './payment.services'

const makePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    const result = await paymentServices.makePayment(data)
    console.log(result)
    res.status(200).json({
      success: true,
      message: 'Payment successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const webHooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await paymentServices.webHooks(req.query)
    res.status(200).json({
      success: true,
      message: 'webHooks successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
export const paymentController = {
  makePayment,
  webHooks,
}
