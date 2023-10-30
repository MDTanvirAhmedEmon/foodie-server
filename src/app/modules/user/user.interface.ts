import { Model } from 'mongoose'

export type IUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  address: string
  zipCode: string
  district: string
  upazila: string
  phone: string
  registrationDate: Date
  role?: 'user'
}

export type UserModel = Model<IUser, Record<string, unknown>>
