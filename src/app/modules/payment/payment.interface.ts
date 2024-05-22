import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'
import { IOrder } from '../order/order.interface'

export type IPayment = {
  price: number
  paymentStatus: string
  transactionId: string
  user: Types.ObjectId | IUser
  order: Types.ObjectId | IOrder
}

export type PaymentModel = Model<IPayment, Record<string, unknown>>
