import { Schema, model } from 'mongoose'
import { IProducts, ProductModel } from './products.interface'

const productsSchema = new Schema<IProducts, ProductModel>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Products = model<IProducts, ProductModel>(
  'Products',
  productsSchema,
)

// const orderProductSchema = new Schema<IOrderProduct>({
//   product:{
//       type: Schema.Types.ObjectId,
//       ref: "Product",
//     },
//   quantity: {
//       type: Number,
//       required: true,
//     },

// });

// export type IOrderProduct = {
//   product: Types.ObjectId | IProducts,
//   quantity: number,
// }
