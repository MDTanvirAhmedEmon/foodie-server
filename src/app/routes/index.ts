import express from 'express'
import { productRoutes } from '../modules/products/products.route'
import { userRouters } from '../modules/user/user.route'
import { authRoutes } from '../modules/auth/auth.route'
import { orderRouters } from '../modules/order/order.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/products',
    element: productRoutes,
  },
  {
    path: '/users',
    element: userRouters,
  },
  {
    path: '/auth',
    element: authRoutes,
  },
  {
    path: '/order',
    element: orderRouters,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.element))

export const managedRouter = router
