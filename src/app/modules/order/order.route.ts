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
router.get('/my-order', auth(ENUM_USER_ROLE.USER), orderController.getMyOrders)
router.get('/latest-order', orderController.latestOrder)
router.get('/last-week-order', orderController.lastWeekOrder)
router.get('/:id', orderController.getSingleOrder)
router.patch('/:id', orderController.updateOrder)

export const orderRouters = router
