"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post('/', products_controller_1.productController.createProduct);
router.get('/:id', products_controller_1.productController.getSingleProduct);
router.get('/', products_controller_1.productController.getAllProducts);
router.delete('/:id', products_controller_1.productController.deleteProduct);
router.patch('/:id', products_controller_1.productController.updateProduct);
exports.productRoutes = router;
