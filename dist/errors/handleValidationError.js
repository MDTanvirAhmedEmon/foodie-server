'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const handelValidationError = error => {
  const errors = Object.values(error.errors).map(element => {
    //validator error
    return {
      path: element.path,
      message: element.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
exports.default = handelValidationError
