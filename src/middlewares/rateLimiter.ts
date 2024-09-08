import rateLimit from 'express-rate-limit'

/**
 * Middleware for rate limiting authentication requests.
 *
 * @remarks
 * This middleware limits the number of authentication requests within a specified time window.
 *
 * @returns The rate limiter middleware.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
})
