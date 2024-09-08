import { Response, type CookieOptions } from 'express'
import config from '../config/config'
import { minutesToMilliseconds } from './time'

/**
 * Sets a cookie in the response object.
 * @param res - The response object.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param options - Optional cookie options.
 */
export const setCookie = (res: Response, name: string, value: string, options = {}) => {
  const defaultOptions = {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'none',
    maxAge: minutesToMilliseconds(24 * 60),
  }

  res.cookie(name, value, { ...defaultOptions, ...options } as CookieOptions)
}
