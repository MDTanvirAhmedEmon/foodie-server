import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser, UserModel>(
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
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<IUser, UserModel>('User', userSchema)
