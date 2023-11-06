import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { createToken } from '../../../helpers/jwtHelpers'
import { Admin } from '../admin/admin.model'
import { User } from '../user/user.model'

const logInUser = async (data: any): Promise<any> => {
  let userExists

  const normalUser = await User.findOne({
    email: data.email,
  })

  const admin = await Admin.findOne({
    email: data.email,
  })

  if (!admin && !normalUser) {
    throw new ApiError(404, 'User not found')
  }

  if (normalUser || admin) {
    userExists = normalUser || admin
  }

  if (userExists && userExists?.password !== data.password) {
    throw new ApiError(403, 'password did not match')
  }

  const payloadData = {
    email: userExists?.email,
    id: userExists?._id,
    role: userExists?.role,
  }

  const accessToken = createToken(
    payloadData,
    config.secret as Secret,
    config.expires_in as string,
  )
  const refreshToken = createToken(
    payloadData,
    config.refresh_secret as Secret,
    config.refresh_expires_in as string,
  )

  return {
    refreshToken,
    accessToken,
  }
}

export const authServices = {
  logInUser,
}
