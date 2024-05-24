"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managedRouter = void 0;
const express_1 = __importDefault(require("express"));
const products_route_1 = require("../modules/products/products.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const order_route_1 = require("../modules/order/order.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/products',
        element: products_route_1.productRoutes,
    },
    {
        path: '/users',
        element: user_route_1.userRouters,
    },
    {
        path: '/auth',
        element: auth_route_1.authRoutes,
    },
    {
        path: '/order',
        element: order_route_1.orderRouters,
    },
    {
        path: '/payment',
        element: payment_route_1.paymentRouters,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.element));
exports.managedRouter = router;
