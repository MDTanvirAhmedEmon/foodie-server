"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouters = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post('/init', payment_controller_1.paymentController.makePayment);
router.post('/payment-success/:tranId', payment_controller_1.paymentController.paymentSuccess);
router.post('/payment-fail/:tranId', payment_controller_1.paymentController.paymentFail);
exports.paymentRouters = router;
