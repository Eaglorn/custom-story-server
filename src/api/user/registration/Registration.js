const md5 = require('md5')
const uuid = require('uuid')
const logger = require('../../../logger')
const db = require('../../../db')
const DateTime = require('luxon').DateTime
const mailRegistration = require('../../../nodemailer')

module.exports = async function (req, res) {
  try {
    const redisEmail = 'registration_check:' + req.body.email
    let user = await db.postgresql.user.findFirst({
      where: { email: req.body.email },
      select: { email: true },
    })
    if (user != null) {
      res.send({
        registration: false,
        email: false,
      })
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
      const code = uuid.v4()
      await db.redis.hset(redisEmail, {
        email: req.body.email,
        password: md5(req.body.password),
        code: code,
        date: DateTime.now().toMillis(),
        type: 'code_write',
      })
      await db.redis.expire(redisEmail, 21600)
      await mailRegistration.sendMail({
        from: 'registration@customstory.online',
        to: req.body.email,
        subject: 'Регистрация в игре CustomStory',
        text: 'Ваш код для подтверждения регистрации:',
        html: '<p>Ваш код для подтверждения регистрации<p>' + code + '</p>',
      })
      res.send({
        success: true,
        registration: false,
      })
    }
  } catch (error) {
    logger.error(error)
  }
}
