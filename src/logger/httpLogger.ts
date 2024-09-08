import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { join } from 'path'
import { myFormat } from './format'

// Log directory
const logDir = 'logs'

// Logger
const httpLogger = createLogger({
  level: 'http',
  format: format.combine(format.timestamp(), myFormat),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.timestamp(), myFormat),
    }),
    new DailyRotateFile({
      filename: join(logDir, '/http-%DATE%.log'),
      level: 'http',
      datePattern: 'DD-MM-YYYY',
    }),
  ],
})

export default httpLogger
