import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (data: IUser): Promise<IUser> => {
  const result = await User.create(data)
  return result
}

export const userServices = {
  createUser,
}
