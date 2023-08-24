import { IProducts } from './products.interface'
import { Products } from './products.model'

const createProduct = async (product: IProducts): Promise<IProducts> => {
  const result = await Products.create(product)
  return result
}

export const productServices = {
  createProduct,
}
