import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'
import { IProducts } from '../products/products.interface'

export type IPayment = {
  price: number
  user: Types.ObjectId | IUser
  product: Types.ObjectId | IProducts
}

export type PaymentModel = Model<IPayment, Record<string, unknown>>
