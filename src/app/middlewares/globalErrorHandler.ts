import { ErrorRequestHandler } from 'express'
import config from '../../config'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../../interfaces/error'
import handelValidationError from '../../errors/handleValidationError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // res.status(400).json({emon: error});

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error.name === 'ValidationError') {
    const simplifiedError: IGenericErrorResponse = handelValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env !== 'production' ? error.stack : undefined,
  })
  next()
}

export default globalErrorHandler
