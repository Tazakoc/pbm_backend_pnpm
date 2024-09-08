import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { join } from 'path'
import { customLevels, type CustomLogger } from './levels'
import { myFormat } from './format'

// Log directory
const logDir = 'logs'

// Logger
const logger = createLogger({
  levels: customLevels.levels,
  format: format.combine(format.timestamp(), myFormat),
  transports: [
    new transports.Console({
      level: 'warn',
      format: format.combine(format.colorize(), format.timestamp(), myFormat),
    }),
    new DailyRotateFile({
      filename: join(logDir, '/error-%DATE%.log'),
      level: 'error',
      datePattern: 'DD-MM-YYYY',
    }),
    new DailyRotateFile({
      level: 'warn',
      filename: join(logDir, '/combined-%DATE%.log'),
      datePattern: 'DD-MM-YYYY',
    }),
  ],
}) as CustomLogger

export default logger
