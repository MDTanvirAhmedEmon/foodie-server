'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Products = void 0
const mongoose_1 = require('mongoose')
const productsSchema = new mongoose_1.Schema(
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
exports.Products = (0, mongoose_1.model)('Products', productsSchema)
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
