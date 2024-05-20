const md5 = require('md5')
const logger = require('../../logger')
const db = require('../../db')
const { userOnline } = require('../../metric').metricUser

module.exports = async function (req, res) {
  try {
    const redisEmail = 'registration_check:' + req.body.email
    const user = await db.postgresql.user.findFirst({
      where: { email: req.body.email },
      select: { password: true, type: true },
    })
    if (user != null) {
      if (md5(req.body.password) === user.password) {
        res.send({ success: true, registration: false, type: user.type })
      } else {
        res.send({
          success: false,
          registration: false,
          email: true,
          password: false,
        })
      }
    } else if (await db.redis.exists(redisEmail)) {
      const registrationCheck = await db.redis.hgetall(redisEmail)
      if (md5(req.body.password) === registrationCheck.password) {
        res.send({
          success: true,
          registration: true,
          type: registrationCheck.type,
        })
      } else {
        res.send({
          success: false,
          registration: true,
          email: true,
          password: false,
        })
      }
    } else {
      res.send({
        success: false,
        registration: false,
        email: false,
      })
    }
  } catch (error) {
    logger.error(error)
  }
}
