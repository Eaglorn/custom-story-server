const Redis = require('ioredis')
const logger = require('./logger')

const redis = new Redis(env('DATABASE_URL_REDIS'))
