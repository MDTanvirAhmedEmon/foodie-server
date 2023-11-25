import { NextFunction, Request, Response } from 'express'
import { userServices } from './user.services'
import config from '../../../config'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body

    const result = await userServices.createUser(data)

    const { refreshToken, ...others } = result
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: others,
    })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    const id = req.params.id
    console.log(data, id)

    const result = await userServices.updateUser(id, data)

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.user

    const result = await userServices.getSingleUser(data)

    res.status(200).json({
      success: true,
      message: 'Get single user successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.getAllUser()

    res.status(200).json({
      success: true,
      message: 'Get all user successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
  updateUser,
  getSingleUser,
  getAllUser,
}
