import { SortOrder } from 'mongoose'
import { IOrder, Ifilter, IpaginationOptions } from './order.interface'
import { Order } from './order.model'
import { User } from '../user/user.model'

const createOrder = async (data: IOrder): Promise<IOrder> => {
  const result = await Order.create(data)
  return result
}

const getAllOrder = async (
  data: any,
  paginationOption: IpaginationOptions,
  filter: Ifilter,
): Promise<any> => {
  // pagination
  const page = paginationOption.page || 1
  const limit = paginationOption.limit || 10
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

  if (searchTerm) {
    andCondition.push(
      {
        'user.firstName': {
          $regex: searchTerm,
          $options: 'i',
        },
      },
      {
        'user.lastName': {
          $regex: searchTerm,
          $options: 'i',
        },
      },
      {
        'user.email': {
          $regex: searchTerm,
          $options: 'i',
        },
      },
      {
        'user.phone': {
          $regex: searchTerm,
          $options: 'i',
        },
      },
    )
  }
  // const searchFields = [
  //   'user.firstName', 'user.lastName', 'user.email', 'user.phone'
  // ]

  // if (searchTerm) {
  //   andCondition.push({
  //     $or: searchFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     })),
  //   })
  // }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}

  if (data.role === 'user') {
    const result = await Order.find({ user: data.id }).populate('user')
    return result
  } else {
    const result = await Order.find(whereConditions)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'user',
        model: User,
      })
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
}

const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById({ _id: id }).populate('user')
  return result
}

export const orderServices = {
  createOrder,
  getAllOrder,
  getSingleOrder,
}
