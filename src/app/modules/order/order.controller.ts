import { NextFunction, Request, Response } from 'express'
import { orderServices } from './order.services'
import pick from '../../../helpers/pick'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
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

const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.orderBy
    // };
    // const filter = {
    //   searchTerm: req.query.searchTerm,
    //   orderStatus: req.query.orderStatus,
    // };
    // console.log(filter);

    const filter = pick(req.query, ['searchTerm', 'orderStatus'])
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])

    const data = req.user

    const result = await orderServices.getAllOrder(
      data,
      paginationOptions,
      filter,
    )
    res.status(200).json({
      success: true,
      message: 'get all order successfully',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.user

    const result = await orderServices.getMyOrders(data)
    res.status(200).json({
      success: true,
      message: 'get my orders successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id

    const result = await orderServices.getSingleOrder(id)
    res.status(200).json({
      success: true,
      message: 'get single order successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const data = req.body

    const result = await orderServices.updateOrder(id, data)
    res.status(200).json({
      success: true,
      message: 'updated order successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const latestOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderServices.latestOrder()
    res.status(200).json({
      success: true,
      message: 'get latest order successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const lastWeekOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await orderServices.lastWeekOrder()
    res.status(200).json({
      success: true,
      message: 'get last week order successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const orderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  getMyOrders,
  latestOrder,
  lastWeekOrder,
}
