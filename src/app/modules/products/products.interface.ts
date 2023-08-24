import { Model } from 'mongoose'

export type IProducts = {
  title: string
  price: number
  imageUrl: string
  category: string
  discountPrice?: number
  description: string
}

export type ProductModel = Model<IProducts, Record<string, unknown>>
