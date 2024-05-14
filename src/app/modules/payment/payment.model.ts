import { Schema, model } from 'mongoose'
import { IPayment, PaymentModel } from './payment.interface'

const paymentSchema = new Schema<IPayment, PaymentModel>(
  {
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<IPayment, PaymentModel>('Payment', paymentSchema)
