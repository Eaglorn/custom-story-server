const winston = require('winston')
const { format } = require('winston')
const { combine, timestamp } = format

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({
      filename: '/home/customstorydev/custom-story-server/logs/debug.log',
      level: 'debug',
    }),
    new winston.transports.File({
      filename: '/home/customstorydev/custom-story-server/logs/warn.log',
      level: 'warn',
    }),
    new winston.transports.File({
      filename: '/home/customstorydev/custom-story-server/logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: '/home/customstorydev/custom-story-server/logs/info.log',
      level: 'info',
    }),
  ],
  exitOnError: false,
})

module.exports = logger
