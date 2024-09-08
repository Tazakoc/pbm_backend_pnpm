import productionLogger from './productionLogger'
import devLogger from './devLogger'
import testingLogger from './testingLogger'
import dotenv from 'dotenv'

dotenv.config()

// Default logger is devLogger
let logger = devLogger

// Set logger based on environment
if (process.env.NODE_ENV === 'production') {
  logger = productionLogger
} else if (process.env.NODE_ENV === 'development') {
  logger = devLogger
} else {
  logger = testingLogger
}

export default logger
