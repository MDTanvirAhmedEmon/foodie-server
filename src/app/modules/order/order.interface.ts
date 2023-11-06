import { Model, SortOrder, Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type IOrderProduct = {
  _id: string
  title: string
  price: number
  imageUrl: string
  category: string
  discountPrice: number
  description: string
  createdAt: Date
  updatedAt: Date
  quantity: number
}

export type IOrder = {
  user: Types.ObjectId | IUser
  product: IOrderProduct[]
  orderDate: Date
  orderStatus: string
  totalPrice: number
}

export type OrderModel = Model<IOrder, Record<string, unknown>>

export type IpaginationOptions = {
  page?: number | undefined
  limit?: number | undefined
  sortBy?: string | any
  sortOrder?: SortOrder | any
}

export type Ifilter = {
  searchTerm?: string | any
}
