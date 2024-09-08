import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import credentials from './middlewares/credentials'
import corsOptions from './config/corsOptions'
import xss from './middlewares/xss'
import config from './config/config'
import { authLimiter } from './middlewares/rateLimiter'
import routes from './routes'
import morgan from './config/morgan'
import { errorHandler } from './middlewares/errorHandler'
import cookieParser from 'cookie-parser'

// Create Express server
const app = express()

if (config.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// set security HTTP headers
app.use(helmet())

// Cookie parser
app.use(cookieParser())

// parse json request body
app.use(express.json())

// Helmet
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// gzip compression
app.use(compression())

// Sanitize request data
app.use(xss())

// Handle options credentials check - before CORS! and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(corsOptions)

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/auth', authLimiter)
}

// Auth routes
app.use('/', routes)

// Error handling middleware
app.use(errorHandler)

export default app
