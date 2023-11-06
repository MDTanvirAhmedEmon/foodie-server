import express from 'express'
import { orderController } from './order.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../enums/user'

const router = express.Router()

router.post('/make-order', orderController.createOrder)
router.get(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  orderController.getAllOrder,
)
router.get('/:id', orderController.getSingleOrder)

export const orderRouters = router
