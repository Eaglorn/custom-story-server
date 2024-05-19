const md5 = require('md5')
const uuid = require('uuid')
const logger = require('../../../logger')
const postgresql = require('../../../dbp')
const redis = require('../../../dbr')
const DateTime = require('luxon').DateTime
const mailRegistration = require('../../../nodemailer')

module.exports = async function (req, res) {
  try {
    let user = await postgresql.user.findFirst({
      where: { email: req.body.email },
      select: { email: true },
    })
    if (user != null) {
      res.send({
        registration: false,
        email: false,
      })
    } else {
      const registrationCheck = await redis.hgetall(
        'registration_check:' + req.body.email
      )
      if (registrationCheck) {
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
        await redis.hset('registration_check:' + req.body.email, {
          email: req.body.email,
          password: md5(req.body.password),
          code: code,
          date: DateTime.now().toMillis(),
        })
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
    }
  } catch (error) {
    logger.error(error)
  }
}
