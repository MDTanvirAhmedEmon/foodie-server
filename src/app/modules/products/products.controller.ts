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

const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const result = await productServices.getSingleProduct(id)
    res.status(200).json({
      success: true,
      message: 'get single product successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await productServices.getAllProducts()
    res.status(200).json({
      success: true,
      message: 'get all products successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const result = await productServices.deleteProduct(id)
    res.status(200).json({
      success: true,
      message: 'product deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await productServices.updateProduct(id, data)
    res.status(200).json({
      success: true,
      message: 'product updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const productController = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
}
