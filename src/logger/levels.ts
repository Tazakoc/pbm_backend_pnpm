import { Logger, addColors } from 'winston'

// Custom logger interface
export interface CustomLogger extends Logger {
  server: (message: string) => Logger
}

// Custom levels and colors
export const customLevels = {
  levels: {
    http: 0,
    error: 1,
    server: 2,
    warn: 3,
    debug: 4,
    info: 5,
    silly: 6,
  },
  colors: {
    server: 'cyan',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'purple',
    silly: 'magenta',
  },
}

// Add colors
addColors(customLevels.colors)
