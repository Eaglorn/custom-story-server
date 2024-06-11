const md5 = require('md5')
const logger = require('../../logger')
const db = require('../../db')

module.exports = function (req, res) {
  const redisEmail = 'user:registration:check:' + req.body.email
  db.postgresql.user
    .findFirst({
      where: { email: req.body.email },
      select: { password: true, type: true },
    })
    .then((user) => {
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
              res.send({
                success: false,
                registration: false,
                email: false,
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
