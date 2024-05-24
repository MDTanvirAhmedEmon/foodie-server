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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const result = yield order_model_1.Order.create(data);
    return result;
});
const getAllOrder = (data, paginationOption, filter) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination
    const page = Number(paginationOption.page || 1);
    const limit = Number(paginationOption.limit || 10);
    const skip = (page - 1) * limit;
    // sorting
    const sortBy = paginationOption.sortBy || 'createdAt';
    const sortOrder = paginationOption.sortOrder || 'desc';
    const sortCondition = {};
    // {createdAt: 'desc'}
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    // searching
    const { searchTerm } = filter, filtersData = __rest(filter, ["searchTerm"]);
    const andCondition = [];
    const searchFields = [
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.phone',
    ];
    if (searchTerm) {
        andCondition.push({
            $or: searchFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield order_model_1.Order.find(whereConditions)
        .populate({
        path: 'user',
        model: user_model_1.User,
    })
        .sort(sortCondition)
        // .sort({createdAt: 'desc'});
        .skip(skip)
        .limit(limit);
    const total = yield order_model_1.Order.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getMyOrders = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.role === 'user') {
        const result = yield order_model_1.Order.find({ user: data.id }).populate('user');
        console.log(result);
        return result;
    }
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById({ _id: id }).populate('user');
    return result;
});
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findByIdAndUpdate({ _id: id }, data, { new: true });
    return result;
});
const latestOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find().sort({ createdAt: -1 }).limit(3);
    return result;
});
const lastWeekOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days in milliseconds
    const lastWeekOrders = yield order_model_1.Order.aggregate([
        {
            $match: {
                createdAt: { $gte: oneWeekAgo, $lt: currentDate },
            },
        },
        {
            $unwind: '$products', // Assuming products is an array field in your order schema
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: '%m/%d/%Y', date: '$createdAt' } },
                },
                totalProducts: { $sum: 1 },
            },
        },
        {
            $sort: { '_id.date': 1 },
        },
    ]);
    return lastWeekOrders;
});
exports.orderServices = {
    createOrder,
    getAllOrder,
    getSingleOrder,
    updateOrder,
    getMyOrders,
    latestOrder,
    lastWeekOrder,
};
