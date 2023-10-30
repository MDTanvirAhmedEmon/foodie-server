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

export const userController = {
  createUser,
}
