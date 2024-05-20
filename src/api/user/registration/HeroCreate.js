const logger = require('../../../logger')
const db = require('../../../db')
const md5 = require('md5')

module.exports = async function (req, res) {
  try {
    const redisEmail = 'registration_check:' + req.body.email
    if (await db.redis.hexists(redisEmail, 'email')) {
      const registrationCheck = await db.redis.hgetall(redisEmail)
      if (md5(req.body.password) === registrationCheck.password) {
        registrationCheck.type = 'hero_create'
        await db.redis.hset(redisEmail, registrationCheck)
      }
    }
  } catch (error) {
    logger.error(error)
  }
}
