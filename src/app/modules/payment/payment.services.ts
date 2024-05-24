/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { Payment } from './payment.model'
const SSLCommerzPayment = require('sslcommerz-lts')
import { Order } from '../order/order.model'
import { Response } from 'express'

const is_live = false //true for live, false for sandbox

const makePayment = async (cus_data: any) => {
  const transactionId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`

  try {
    const data = {
      store_id: config.store_id,
      store_passwd: config.store_password,
      total_amount: cus_data.allOrderInfo.total_amount,
      currency: 'BDT',
      tran_id: transactionId, // use unique tran_id for each api call
      success_url: `https://foodie-server-red.vercel.app/api/v1/payment/payment-success/${transactionId}`,
      fail_url: `https://foodie-server-red.vercel.app/api/v1/payment/payment-fail/${transactionId}`,
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'N/A',
      product_name: cus_data.allOrderInfo.product_name,
      product_category: cus_data.allOrderInfo.product_category,
      product_profile: cus_data.allOrderInfo.product_profile,
      cus_name: cus_data.allOrderInfo.cus_name,
      cus_email: cus_data.allOrderInfo.cus_email,
      cus_add1: cus_data.allOrderInfo.cus_add1,
      cus_city: cus_data.allOrderInfo.cus_city,
      cus_state: cus_data.allOrderInfo.cus_state,
      cus_postcode: cus_data.allOrderInfo.cus_postcode,
      cus_country: cus_data.allOrderInfo.cus_country,
      cus_phone: cus_data.allOrderInfo.cus_phone,
      cus_fax: 'N/A',
      ship_name: 'N/A',
      ship_add1: 'N/A',
      ship_add2: 'N/A',
      ship_city: 'N/A',
      ship_state: 'N/A',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    }

    const sslcz = new SSLCommerzPayment(
      config.store_id,
      config.store_password,
      is_live,
    )
    const apiResponse = await sslcz.init(data)

    if (apiResponse.GatewayPageURL) {
      console.log('Gateway Page URL:', apiResponse.GatewayPageURL)

      // Create order in the database

      const orderResult: any = await Order.create(cus_data.orderData)
      console.log('Order created with ID:', orderResult._id)
      console.log(orderResult)

      // Create payment in the database
      if (orderResult._id) {
        const paymentResult = await Payment.create({
          price: cus_data.allOrderInfo.total_amount,
          paymentStatus: 'pending',
          transactionId: transactionId, // ensure this is consistent
          user: cus_data.allOrderInfo.user_id,
          order: orderResult._id,
        })
        console.log('Payment created:', paymentResult)
      }
    }
    return { url: apiResponse.GatewayPageURL }
  } catch (error) {
    throw new ApiError(400, 'payment error')
  }
}

const paymentSuccess = async (tranId: any, res: Response) => {
  const result = await Payment.findOneAndUpdate(
    { transactionId: tranId },
    { paymentStatus: 'paid' },
  )
  if (result) {
    res.redirect('https://stellar-sunflower-9a74d4.netlify.app/thank-you')
  }
}

const paymentFail = async (tranId: any, res: Response) => {
  console.log(tranId)
  const result = await Payment.findOneAndDelete({ transactionId: tranId })
  if (result) {
    res.redirect('https://stellar-sunflower-9a74d4.netlify.app/payment-fail')
  }
}

export const paymentServices = {
  makePayment,
  paymentSuccess,
  paymentFail,
}
