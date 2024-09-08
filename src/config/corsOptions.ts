import cors, { CorsOptions } from 'cors'
import config from './config'

/**
 * Configuration options for CORS (Cross-Origin Resource Sharing).
 */
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const requestOrigin = origin ?? ''
    if (config.allowedOrigins.includes(requestOrigin) || !requestOrigin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}

export default cors(corsOptions)
