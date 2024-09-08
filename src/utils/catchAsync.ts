import { RequestHandler, Request, Response, NextFunction } from 'express'
import qs from 'qs'

export interface CustomParamsDictionary {
  [key: string]: string
}

/**
 * Catch async errors and pass them to the error handling middleware.
 */
const catchAsync =
  (fn: RequestHandler<CustomParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }

export default catchAsync
