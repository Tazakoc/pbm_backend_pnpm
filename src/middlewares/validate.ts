import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import pick from '../utils/pick'
import ApiError from '../utils/ApiError'

/**
 * Validates the request against the provided schema.
 *
 * @param schema - The schema object to validate against.
 * @returns A middleware function that performs the validation.
 */
const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const obj = pick(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(obj)
  if (error) {
    const errorMessage = error.details
      .map(function (details) {
        return details.message
      })
      .join(', ')
    next(new ApiError(errorMessage, httpStatus.BAD_REQUEST))
    return
  }
  Object.assign(req, value)
  next()
}

export default validate
