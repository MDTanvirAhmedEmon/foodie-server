'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.authServices = void 0
const config_1 = __importDefault(require('../../../config'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const jwtHelpers_1 = require('../../../helpers/jwtHelpers')
const admin_model_1 = require('../admin/admin.model')
const user_model_1 = require('../user/user.model')
const logInUser = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    let userExists
    const normalUser = yield user_model_1.User.findOne({
      email: data.email,
    })
    const admin = yield admin_model_1.Admin.findOne({
      email: data.email,
    })
    if (!admin && !normalUser) {
      throw new ApiError_1.default(404, 'User not found')
    }
    if (normalUser || admin) {
      userExists = normalUser || admin
    }
    if (
      userExists &&
      (userExists === null || userExists === void 0
        ? void 0
        : userExists.password) !== data.password
    ) {
      throw new ApiError_1.default(403, 'password did not match')
    }
    const payloadData = {
      email:
        userExists === null || userExists === void 0
          ? void 0
          : userExists.email,
      id:
        userExists === null || userExists === void 0 ? void 0 : userExists._id,
      role:
        userExists === null || userExists === void 0 ? void 0 : userExists.role,
    }
    const accessToken = (0, jwtHelpers_1.createToken)(
      payloadData,
      config_1.default.secret,
      config_1.default.expires_in,
    )
    const refreshToken = (0, jwtHelpers_1.createToken)(
      payloadData,
      config_1.default.refresh_secret,
      config_1.default.refresh_expires_in,
    )
    return {
      refreshToken,
      accessToken,
    }
  })
exports.authServices = {
  logInUser,
}
