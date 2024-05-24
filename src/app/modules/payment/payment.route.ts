import express from 'express'
import { paymentController } from './payment.controller'

const router = express.Router()

router.post('/init', paymentController.makePayment)
router.post('/payment-success/:tranId', paymentController.paymentSuccess)
router.post('/payment-fail/:tranId', paymentController.paymentFail)

export const paymentRouters = router
