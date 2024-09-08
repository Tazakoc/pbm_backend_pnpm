import moment from 'moment'
import { format } from 'winston'

// Custom format for logging
export const myFormat = format.combine(
  format.timestamp({
    format: () => moment().format('DD-MMM-YYYY HH:mm:ss'),
  }),
  format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${label || ''} [${level}]: ${message}`
  })
)
