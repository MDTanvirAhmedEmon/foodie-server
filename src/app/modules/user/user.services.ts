import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { createToken } from '../../../helpers/jwtHelpers'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (data: IUser): Promise<any> => {
  const isExist = await User.findOne({
    email: data.email,
  })

  if (isExist) {
    throw new ApiError(404, 'User already exists')
  }

  const result = await User.create(data)

  const tokenPayload = {
    email: result.email,
    role: result.role,
  }

  const accessToken = createToken(
    tokenPayload,
    config.secret as Secret,
    config.expires_in as string,
  )
  const refreshToken = createToken(
    tokenPayload,
    config.refresh_secret as Secret,
    config.refresh_expires_in as string,
  )

  return {
    refreshToken,
    accessToken,
    result,
  }
}

const updateUser = async (id: any, data: Partial<IUser>): Promise<any> => {
  const result = await User.findOneAndUpdate({ _id: id }, data, { new: true })
  return result
}

const getSingleUser = async (data: any): Promise<IUser | null> => {
  const result = await User.findOne({ email: data.email })
  return result
}

export const userServices = {
  createUser,
  updateUser,
  getSingleUser,
}
