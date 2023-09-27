import express from 'express'
import { productController } from './products.controller'
const router = express.Router()

router.post('/', productController.createProduct)
router.get('/:id', productController.getSingleProduct)
router.get('/', productController.getAllProducts)
router.delete('/:id', productController.deleteProduct)
router.patch('/:id', productController.updateProduct)

export const productRoutes = router
