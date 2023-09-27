import { IProducts } from './products.interface'
import { Products } from './products.model'

const createProduct = async (product: IProducts): Promise<IProducts> => {
  const result = await Products.create(product)
  return result
}

const getSingleProduct = async (id: string): Promise<IProducts | null> => {
  const result = await Products.findById({ _id: id })
  return result
}

const getAllProducts = async (): Promise<IProducts[] | null> => {
  const result = await Products.find({})
  return result
}

const deleteProduct = async (id: string): Promise<IProducts | null> => {
  const result = await Products.findByIdAndDelete({ _id: id })
  return result
}

const updateProduct = async (
  id: string,
  payload: Partial<IProducts>,
): Promise<IProducts | null> => {
  const result = await Products.findByIdAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const productServices = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
}
