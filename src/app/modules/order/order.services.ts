import { IOrder } from './order.interface'
import { Order } from './order.model'

const createOrder = async (data: IOrder): Promise<IOrder> => {
  const result = await Order.create(data)
  return result
}

export const orderServices = {
  createOrder,
}
