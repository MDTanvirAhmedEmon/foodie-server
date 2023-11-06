"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    upazila: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
