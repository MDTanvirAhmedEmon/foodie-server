"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const payment_model_1 = require("./payment.model");
const SSLCommerzPayment = require('sslcommerz-lts');
const order_model_1 = require("../order/order.model");
const is_live = false; //true for live, false for sandbox
const makePayment = (cus_data) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    try {
        const data = {
            store_id: config_1.default.store_id,
            store_passwd: config_1.default.store_password,
            total_amount: cus_data.allOrderInfo.total_amount,
            currency: 'BDT',
            tran_id: transactionId,
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
        };
        const sslcz = new SSLCommerzPayment(config_1.default.store_id, config_1.default.store_password, is_live);
        const apiResponse = yield sslcz.init(data);
        if (apiResponse.GatewayPageURL) {
            console.log('Gateway Page URL:', apiResponse.GatewayPageURL);
            // Create order in the database
            const orderResult = yield order_model_1.Order.create(cus_data.orderData);
            console.log('Order created with ID:', orderResult._id);
            console.log(orderResult);
            // Create payment in the database
            if (orderResult._id) {
                const paymentResult = yield payment_model_1.Payment.create({
                    price: cus_data.allOrderInfo.total_amount,
                    paymentStatus: 'pending',
                    transactionId: transactionId,
                    user: cus_data.allOrderInfo.user_id,
                    order: orderResult._id,
                });
                console.log('Payment created:', paymentResult);
            }
        }
        return { url: apiResponse.GatewayPageURL };
    }
    catch (error) {
        throw new ApiError_1.default(400, 'payment error');
    }
});
const paymentSuccess = (tranId, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findOneAndUpdate({ transactionId: tranId }, { paymentStatus: 'paid' });
    if (result) {
        res.redirect('https://stellar-sunflower-9a74d4.netlify.app/thank-you');
    }
});
const paymentFail = (tranId, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(tranId);
    const result = yield payment_model_1.Payment.findOneAndDelete({ transactionId: tranId });
    if (result) {
        res.redirect('https://stellar-sunflower-9a74d4.netlify.app/payment-fail');
    }
});
exports.paymentServices = {
    makePayment,
    paymentSuccess,
    paymentFail,
};
