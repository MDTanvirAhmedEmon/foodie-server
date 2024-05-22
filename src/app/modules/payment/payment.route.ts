import express from 'express'
import { paymentController } from './payment.controller'

const router = express.Router()

router.post('/init', paymentController.makePayment)
router.post('/webhook', paymentController.webHooks)

export const paymentRouters = router
