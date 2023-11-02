import { Schema, model } from 'mongoose'
import { IOrder, IOrderProduct, OrderModel } from './order.interface'

const orderProductSchema = new Schema<IOrderProduct>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  discountPrice: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  quantity: { type: Number, required: true },
})

const orderSchema = new Schema<IOrder, OrderModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product: [orderProductSchema],
    orderDate: {
      type: Date,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Order = model<IOrder, OrderModel>('Order', orderSchema)
