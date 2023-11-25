"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, secret, expireDuration) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expireDuration });
};
exports.createToken = createToken;
const verifyToken = (payload, secret) => {
    return jsonwebtoken_1.default.verify(payload, secret);
};
exports.verifyToken = verifyToken;
