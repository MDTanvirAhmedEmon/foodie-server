import { NextFunction, Request, Response } from 'express'
import { paymentServices } from './payment.services'

const makePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    console.log(data)
    const result = await paymentServices.makePayment(data)
    res.status(200).json({
      success: true,
      message: 'Payment successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const paymentController = {
  makePayment,
}
