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
exports.userServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("./user.model");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({
        email: data.email,
    });
    if (isExist) {
        throw new ApiError_1.default(404, 'User already exists');
    }
    const result = yield user_model_1.User.create(data);
    const tokenPayload = {
        email: result.email,
        id: result._id,
        role: result.role,
    };
    const accessToken = (0, jwtHelpers_1.createToken)(tokenPayload, config_1.default.secret, config_1.default.expires_in);
    const refreshToken = (0, jwtHelpers_1.createToken)(tokenPayload, config_1.default.refresh_secret, config_1.default.refresh_expires_in);
    return {
        refreshToken,
        accessToken,
        result,
    };
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, data, { new: true });
    return result;
});
const getSingleUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email: data.email });
    return result;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return result;
});
exports.userServices = {
    createUser,
    updateUser,
    getSingleUser,
    getAllUser,
};
