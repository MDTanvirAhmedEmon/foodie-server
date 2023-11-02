import { NextFunction, Request, Response } from 'express'
import { orderServices } from './order.services'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    console.log(data)
    const result = await orderServices.createOrder(data)
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const orderController = {
  createOrder,
}
