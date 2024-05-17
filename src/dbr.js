const { Redis } = require('ioredis')

const redis = new Redis(env('DATABASE_URL_REDIS'))
module.exports = redis
