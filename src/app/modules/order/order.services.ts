import { SortOrder } from 'mongoose'
import { User } from '../user/user.model'
import { IOrder, Ifilter, IpaginationOptions } from './order.interface'
import { Order } from './order.model'

const createOrder = async (data: IOrder): Promise<IOrder> => {
  const result = await Order.create(data)
  return result
}

const getAllOrder = async (
  data: any,
  paginationOption: IpaginationOptions,
  filter: Ifilter,
): Promise<any> => {
  console.log('services', data)

  // pagination
  const page = Number(paginationOption.page || 1)
  const limit = Number(paginationOption.limit || 10)
  const skip = (page - 1) * limit

  // sorting
  const sortBy = paginationOption.sortBy || 'createdAt'
  const sortOrder = paginationOption.sortOrder || 'desc'
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  // searching
  const { searchTerm, ...filtersData } = filter
  const andCondition = []

  // if (searchTerm) {
  //   andCondition.push(
  //     {
  //       'user.firstName': {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     },
  //     {
  //       'user.lastName': {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     },
  //     {
  //       'user.email': {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     },
  //     {
  //       'user.phone': {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     },
  //   )
  // }
  const searchFields = [
    'user.firstName',
    'user.lastName',
    'user.email',
    'user.phone',
  ]

  if (searchTerm) {
    andCondition.push({
      $or: searchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}

  const result = await Order.find(whereConditions)
    .populate({
      path: 'user',
      model: User,
    })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Order.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getMyOrders = async (data: any): Promise<any> => {
  if (data.role === 'user') {
    const result = await Order.find({ user: data.id }).populate('user')
    console.log(result)
    return result
  }
}

const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById({ _id: id }).populate('user')
  return result
}

const updateOrder = async (
  id: string,
  data: Partial<IOrder>,
): Promise<IOrder | null> => {
  const result = await Order.findByIdAndUpdate({ _id: id }, data, { new: true })
  return result
}

const latestOrder = async (): Promise<IOrder[]> => {
  const result = await Order.find().sort({ createdAt: -1 }).limit(3)
  return result
}

const lastWeekOrder = async (): Promise<IOrder[]> => {
  const currentDate: any = new Date()
  const oneWeekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000) // Subtract 7 days in milliseconds

  const lastWeekOrders = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: oneWeekAgo, $lt: currentDate },
      },
    },
    {
      $unwind: '$products', // Assuming products is an array field in your order schema
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%m/%d/%Y', date: '$createdAt' } },
        },
        totalProducts: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.date': 1 },
    },
  ])

  return lastWeekOrders
}

export const orderServices = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  getMyOrders,
  latestOrder,
  lastWeekOrder,
}
