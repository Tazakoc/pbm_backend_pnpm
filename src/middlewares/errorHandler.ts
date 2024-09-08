import { ErrorRequestHandler } from 'express'
import { Prisma } from '@prisma/client'
import httpStatus from 'http-status'
import config from '../config/config'
import ApiError from '../utils/ApiError'
import logger from '../logger'
import { simplifyStack } from '../utils/simplifyStack'

// Define the type for httpStatus keys
type HttpStatusKeys = keyof typeof httpStatus

/**
 * Error converter to convert errors to ApiError instances.
 *
 * @param err - The error to convert.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call in the middleware chain.
 * @returns The next function to call in the middleware chain.
 * @throws ApiError
 */
export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode as HttpStatusKeys]
    error = new ApiError(message, statusCode, false, err.stack)
  }
  next(error)
}

/**
 *  Error handler to send responses with error status codes and messages.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns The response with the error status code and message.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err

  // Ensure statusCode and message are defined
  if (!statusCode) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
  }
  if (!message) {
    message = httpStatus[statusCode as HttpStatusKeys]
  }

  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR as HttpStatusKeys]
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: simplifyStack(err.stack) }),
  }

  if (config.env === 'development') {
    logger.error('-', err)
  }

  res.status(statusCode).send(response)
}
