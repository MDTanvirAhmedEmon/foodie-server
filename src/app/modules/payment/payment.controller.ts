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

const paymentSuccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tranId = req.params.tranId
    const result = await paymentServices.paymentSuccess(tranId, res)
    res.status(200).json({
      success: true,
      message: 'payment successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const paymentFail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tranId = req.params.tranId
    const result = await paymentServices.paymentFail(tranId, res)
    res.status(200).json({
      success: true,
      message: 'payment failed',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const paymentController = {
  makePayment,
  paymentSuccess,
  paymentFail,
}
