"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    price: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
}, {
    timestamps: true,
});
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema);
