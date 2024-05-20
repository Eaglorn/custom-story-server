const { Redis } = require('ioredis')
const redis = new Redis(process.env.DATABASE_URL_REDIS)
module.exports = redis
