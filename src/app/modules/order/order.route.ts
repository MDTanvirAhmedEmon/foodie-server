import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()

router.post('/make-order', orderController.createOrder)

export const orderRouters = router
