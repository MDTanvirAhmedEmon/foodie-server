import { Model } from 'mongoose'

export type IAdmin = {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  role?: 'admin'
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>
