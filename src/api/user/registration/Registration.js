const md5 = require('md5')
const uuid = require('uuid')
const logger = require('../../../logger')
const db = require('../../../db')
const mailRegistration = require('../../../nodemailer')

module.exports = function (req, res) {
  const redisEmail = 'user:registration:check:' + req.body.email
  db.postgresql.user
    .findFirst({
      where: { email: req.body.email },
      select: { email: true },
    })
    .then((user) => {
      if (user != null) {
        res.send({
          registration: false,
          email: false,
        })
      } else {
        db.redis
          .exists(redisEmail)
          .then((result) => {
            if (result != 0) {
              db.redis
                .hgetall(redisEmail)
                .then((registrationCheck) => {
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
                })
                .catch((error) => {
                  logger.log('error', error)
                })
            } else {
              const code = uuid.v4()
              db.redis
                .hset(redisEmail, {
                  email: req.body.email,
                  password: md5(req.body.password),
                  code: code,
                  type: 'code_write',
                })
                .then(() => {
                  db.redis
                    .expire(redisEmail, 21600)
                    .then(() => {
                      mailRegistration
                        .sendMail({
                          from: 'registration@customstory.online',
                          to: req.body.email,
                          subject: 'Регистрация в игре CustomStory',
                          text: 'Ваш код для подтверждения регистрации:',
                          html:
                            '<p>Ваш код для подтверждения регистрации<p>' +
                            code +
                            '</p>',
                        })
                        .then(() => {
                          res.send({
                            success: true,
                            registration: false,
                          })
                        })
                        .catch((error) => {
                          logger.log('error', error)
                        })
                    })
                    .catch((error) => {
                      logger.log('error', error)
                    })
                })
                .catch((error) => {
                  logger.log('error', error)
                })
            }
          })
          .catch((error) => {
            logger.log('error', error)
          })
      }
    })
    .catch((error) => {
      logger.log('error', error)
    })
}
