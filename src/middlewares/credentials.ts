import { Request, Response, NextFunction } from 'express'
import config from '../config/config'

/**
 * Middleware that sets the 'Access-Control-Allow-Credentials' header based on the request's origin.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call in the middleware chain.
 */
const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin!
  if (config.allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  next()
}

export default credentials
