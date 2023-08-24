import express from 'express'
import { productRoutes } from '../modules/products/products.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/products',
    element: productRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.element))

export const managedRouter = router
