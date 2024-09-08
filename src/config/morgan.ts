import { Response } from 'express'
import morgan from 'morgan'
import config from './config'
import logger from '../logger'
import httpLogger from '../logger/httpLogger'

/**
 * Defines the format string for successful response logs.
 * @param req - The request object.
 * @param res - The response object.
 * @returns void
 */
morgan.token('message', (req, res: Response) => res.locals.errorMessage || '')
morgan.token('origin', (req) => req.headers.origin || '')

/**
 * Gets the IP format based on the environment.
 * @returns The IP format based on the environment.
 */
const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '')

// Define the success and error response formats
/**
 * The format string for successful response logs.
 *
 * @remarks
 * This format string includes placeholders for various information related to the response.
 * - `:method` represents the HTTP method used in the request.
 * - `:origin` represents the origin of the request.
 * - `:url` represents the URL of the request.
 * - `:status` represents the HTTP status code of the response.
 * - `:http-version` represents the HTTP version used in the request.
 * - `:response-time` represents the response time in milliseconds.
 * - `:message` represents the message associated with the response.
 *
 * @example
 * ```typescript
 * const successResponseFormat = `${getIpFormat()}Method: :method, Origin: :origin, URL: :url, Status: :status, HTTP Version: :http-version, Response Time: :response-time ms, message: :message`
 * ```
 */
const successResponseFormat = `${getIpFormat()}Method: :method, Origin: :origin, URL: :url, Status: :status, HTTP Version: :http-version, Response Time: :response-time ms, message: :message`
const errorResponseFormat = `${getIpFormat()}Method: :method, Origin: :origin, URL: :url, Status: :status, HTTP Version: :http-version, Response Time: :response-time ms, message: :message`

/**
 * Defines the success handler for the Morgan middleware.
 * @param req - The request object.
 * @param res - The response object.
 * @returns void
 */
export const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => httpLogger.http(message.trim()) },
})

/**
 * Defines the error handler for the Morgan middleware.
 * @param req - The request object.
 * @param res - The response object.
 * @returns void
 */
export const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
})

// Export the handlers
export default {
  successHandler,
  errorHandler,
}
