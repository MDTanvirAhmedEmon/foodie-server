'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const config_1 = __importDefault(require('../../config'))
const handleValidationError_1 = __importDefault(
  require('../../errors/handleValidationError'),
)
const ApiError_1 = __importDefault(require('../../errors/ApiError'))
const globalErrorHandler = (error, req, res, next) => {
  // res.status(400).json({emon: error});
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages = []
  if (error.name === 'ValidationError') {
    const simplifiedError = (0, handleValidationError_1.default)(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof Error) {
    message = error === null || error === void 0 ? void 0 : error.message
    errorMessages = (
      error === null || error === void 0 ? void 0 : error.message
    )
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : []
  } else if (error instanceof ApiError_1.default) {
    statusCode = error === null || error === void 0 ? void 0 : error.statusCode
    message = error === null || error === void 0 ? void 0 : error.message
    errorMessages = (
      error === null || error === void 0 ? void 0 : error.message
    )
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config_1.default.node_env !== 'production' ? error.stack : undefined,
  })
  next()
}
exports.default = globalErrorHandler
