import { Server } from 'http'
import prisma from './client'
import app from './app'
import config from './config/config'
import logger from './logger'

let server: Server | null = null

const startServer = async () => {
  try {
    await prisma.$connect()
    logger.info('Connected to SQL Database')
    server = app.listen(config.port, () => {
      logger.server(`Listening to port: ${config.port} and environment"${config.env}`)
    })
  } catch (error) {
    logger.error('Failed to connect to SQL Database or start server w/ error:', error)
    process.exit(1)
  }
}

const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} received`)
  if (server) {
    server.close(async (err) => {
      if (err) {
        logger.error('Error during server shutdown', err)
        process.exit(1)
      }
      try {
        await prisma.$disconnect()
        logger.warn('Disconnected from SQL Database')
      } catch (disconnectError) {
        logger.error('Failed to disconnect from SQL Database', disconnectError)
      }
      logger.info('Server closed')
      process.exit(0)
    })
  } else {
    process.exit(0)
  }
}

// Handle uncaught exceptions and unhandled promise rejections
const unexpectedErrorHandler = (error: unknown) => {
  logger.error('Unexpected error', error)
  gracefulShutdown('UnexpectedError').catch((shutdownError) =>
    logger.error('Failed during unexpected error shutdown', shutdownError)
  )
}

// Start the server
startServer()

// Setup signal handlers and error listeners
process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))
