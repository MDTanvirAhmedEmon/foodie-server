"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const payment_services_1 = require("./payment.services");
const makePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield payment_services_1.paymentServices.makePayment(data);
        console.log(result);
        res.status(200).json({
            success: true,
            message: 'Payment successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const paymentSuccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tranId = req.params.tranId;
        const result = yield payment_services_1.paymentServices.paymentSuccess(tranId, res);
        res.status(200).json({
            success: true,
            message: 'payment successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const paymentFail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tranId = req.params.tranId;
        const result = yield payment_services_1.paymentServices.paymentFail(tranId, res);
        res.status(200).json({
            success: true,
            message: 'payment failed',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.paymentController = {
    makePayment,
    paymentSuccess,
    paymentFail,
};
