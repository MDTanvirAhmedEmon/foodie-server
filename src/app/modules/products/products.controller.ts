import { NextFunction, Request, Response } from 'express'
import { productServices } from './products.services'

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productData = req.body
    const result = await productServices.createProduct(productData)
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const productController = {
  createProduct,
}
