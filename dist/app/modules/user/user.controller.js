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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_services_1 = require("./user.services");
const config_1 = __importDefault(require("../../../config"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield user_services_1.userServices.createUser(data);
        const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: others,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = req.params.id;
        console.log(data, id);
        const result = yield user_services_1.userServices.updateUser(id, data);
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.user;
        const result = yield user_services_1.userServices.getSingleUser(data);
        res.status(200).json({
            success: true,
            message: 'Get single user successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getAllUser();
        res.status(200).json({
            success: true,
            message: 'Get all user successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    createUser,
    updateUser,
    getSingleUser,
    getAllUser,
};
