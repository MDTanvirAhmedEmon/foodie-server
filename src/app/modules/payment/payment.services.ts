/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { Payment } from './payment.model'
import SSLCommerzPayment from 'sslcommerz-lts'

const is_live = false //true for live, false for sandbox

const makePayment = async (cus_data: any) => {
  console.log('payment data', cus_data)
  const transactionId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`
  try {
    const data = {
      store_id: config.store_id,
      store_passwd: config.store_password,
      total_amount: cus_data.total_amount,
      currency: 'BDT',
      tran_id: transactionId, // use unique tran_id for each api call
      success_url: 'http://localhost:3030/success',
      fail_url: 'http://localhost:3030/fail',
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'N/A',
      product_name: cus_data.product_name,
      product_category: cus_data.product_category,
      product_profile: cus_data.product_profile,
      cus_name: cus_data.cus_name,
      cus_email: cus_data.cus_email,
      cus_add1: cus_data.cus_add1,
      cus_city: cus_data.cus_city,
      cus_state: cus_data.cus_state,
      cus_postcode: cus_data.cus_postcode,
      cus_country: cus_data.cus_country,
      cus_phone: cus_data.cus_phone,
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    }

    // const res = await axios({
    //   method: 'POST',
    //   url: config.sslPaymentUrl,
    //   data: data,
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // })
    // console.log(res)

    const sslcz = new SSLCommerzPayment(
      config.store_id,
      config.store_password,
      is_live,
    )
    const apiResponse = await sslcz.init(data)

    if (apiResponse.GatewayPageURL) {
      // Create payment in database
      // await Payment.create({
      //   price: cus_data.total_amount,
      //   paymentStatus: 'pending',
      //   transactionId: cus_data.tran_id,
      //   user: cus_data.user_id,
      //   product: cus_data.product_id,
      // });

      return { url: apiResponse.GatewayPageURL }
    }

    // create payment in database
    // const paymentResult = await Payment.create({
    //   price: cus_data.total_amount,
    //   paymentStatus: 'pending',
    //   transactionId: cus_data.tran_id,
    //   user: cus_data.user_id,
    //   product: cus_data.product_id,
    // });

    // console.log(paymentResult);

    // return res.data.redirectGatewayURL
  } catch (error) {
    throw new ApiError(400, 'payment error')
  }
}

const webHooks = async (data: any) => {
  try {
    if (!data || !data.status || data?.status !== 'VALID') {
      return {
        message: 'Invalid payment',
      }
    }

    const res = await axios({
      method: 'GET',
      url: `${config.sslValidateUrl}?val_id=${data.val_id}&store_id=${config.store_id}&store_password=${config.store_password}&format=json`,
    })

    if (res?.data?.status !== 'VALID') {
      return {
        message: 'Invalid payment',
      }
    }

    const { tran_id } = res.data

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: tran_id },
      { paymentStatus: 'paid' },
    )
    return {
      message: 'Payment successful',
    }
  } catch (error) {
    throw new ApiError(400, 'payment error')
  }
}

export const paymentServices = {
  makePayment,
  webHooks,
}
