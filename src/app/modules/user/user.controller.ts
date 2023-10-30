import { NextFunction, Request, Response } from 'express'
import { userServices } from './user.services'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body

    const result = await userServices.createUser(data)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
}
