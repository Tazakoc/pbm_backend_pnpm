import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'
import logger from '../logger'

dotenv.config({ path: path.join(process.cwd(), '.env') })

/**
 * Defines the schema for the environment variables used in the application.
 *
 * @remarks
 * This schema includes the following keys:
 * - `NODE_ENV`: The environment mode of the application.
 * - `PORT`: The port number on which the application will run.
 * - `FRONTEND_ORIGIN`: The origin of the frontend application.
 */

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    FRONTEND_ORIGIN: Joi.string()
      .required()
      .description('The origin of the frontend app')
      .default('http://localhost:3000'),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  logger.error(`Config validation error: ${error.message}`)
  process.exit(1)
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  allowedOrigins: [envVars.FRONTEND_ORIGIN, envVars.BACKEND_ORIGIN],
}
