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
exports.productController = void 0;
const products_services_1 = require("./products.services");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const result = yield products_services_1.productServices.createProduct(productData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield products_services_1.productServices.getSingleProduct(id);
        res.status(200).json({
            success: true,
            message: 'get single product successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_services_1.productServices.getAllProducts();
        res.status(200).json({
            success: true,
            message: 'get all products successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield products_services_1.productServices.deleteProduct(id);
        res.status(200).json({
            success: true,
            message: 'product deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = yield products_services_1.productServices.updateProduct(id, data);
        res.status(200).json({
            success: true,
            message: 'product updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.productController = {
    createProduct,
    getSingleProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
};
