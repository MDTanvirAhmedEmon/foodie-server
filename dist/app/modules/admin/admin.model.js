'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Admin = void 0
const mongoose_1 = require('mongoose')
const adminSchema = new mongoose_1.Schema(
  {
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
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema)
