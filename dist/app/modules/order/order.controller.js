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
exports.orderController = void 0;
const order_services_1 = require("./order.services");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        const result = yield order_services_1.orderServices.createOrder(data);
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.user;
        const result = yield order_services_1.orderServices.getAllOrder(data);
        res.status(200).json({
            success: true,
            message: 'get all order successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const result = yield order_services_1.orderServices.getSingleOrder(id);
        res.status(200).json({
            success: true,
            message: 'get single order successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.orderController = {
    createOrder,
    getAllOrder,
    getSingleOrder,
};
