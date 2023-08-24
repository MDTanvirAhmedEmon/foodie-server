import express from 'express'
import { productController } from './products.controller'
const router = express.Router()

router.post('/', productController.createProduct)

export const productRoutes = router
