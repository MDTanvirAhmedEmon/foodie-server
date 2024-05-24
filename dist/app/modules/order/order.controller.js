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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_services_1 = require("./order.services");
const pick_1 = __importDefault(require("../../../helpers/pick"));
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
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
        // const paginationOptions = {
        //   page: Number(req.query.page),
        //   limit: Number(req.query.limit),
        //   sortBy: req.query.sortBy,
        //   sortOrder: req.query.orderBy
        // };
        // const filter = {
        //   searchTerm: req.query.searchTerm,
        //   orderStatus: req.query.orderStatus,
        // };
        // console.log(filter);
        const filter = (0, pick_1.default)(req.query, ['searchTerm', 'orderStatus']);
        const paginationOptions = (0, pick_1.default)(req.query, [
            'page',
            'limit',
            'sortBy',
            'sortOrder',
        ]);
        const data = req.user;
        const result = yield order_services_1.orderServices.getAllOrder(data, paginationOptions, filter);
        res.status(200).json({
            success: true,
            message: 'get all order successfully',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
const getMyOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.user;
        const result = yield order_services_1.orderServices.getMyOrders(data);
        res.status(200).json({
            success: true,
            message: 'get my orders successfully',
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
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = yield order_services_1.orderServices.updateOrder(id, data);
        res.status(200).json({
            success: true,
            message: 'updated order successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const latestOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_services_1.orderServices.latestOrder();
        res.status(200).json({
            success: true,
            message: 'get latest order successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const lastWeekOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_services_1.orderServices.lastWeekOrder();
        res.status(200).json({
            success: true,
            message: 'get last week order successfully',
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
    updateOrder,
    getMyOrders,
    latestOrder,
    lastWeekOrder,
};
