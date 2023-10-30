import { NextFunction, Request, Response } from 'express'
import { authServices } from './auth.services'
import config from '../../../config'

const logInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    const result = await authServices.logInUser(data)

    const { refreshToken, ...others } = result
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    res.status(200).json({
      success: true,
      message: 'log In User successfully',
      data: others,
    })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  logInUser,
}
