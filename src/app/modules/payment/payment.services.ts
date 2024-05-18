import axios from 'axios'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'

const makePayment = async (cus_data: any) => {
  try {
    const data = {
      store_id: config.store_id,
      store_passwd: config.store_password,
      total_amount: cus_data.total_amount,
      currency: 'BDT',
      tran_id: cus_data.tran_id, // use unique tran_id for each api call
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

    const res = await axios({
      method: 'POST',
      url: config.sslPaymentUrl,
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    console.log(res)

    return res.data
  } catch (error) {
    throw new ApiError(400, 'payment error')
  }
}

export const paymentServices = {
  makePayment,
}
