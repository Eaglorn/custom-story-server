const logger = require('../../../logger')
const db = require('../../../db')
const md5 = require('md5')

module.exports = function (req, res) {
  const redisEmail = 'user:registration:check:' + req.body.email
  db.redis
    .exists(redisEmail)
    .then((result) => {
      if (result != 0) {
        db.redis
          .hgetall(redisEmail)
          .then((registrationCheck) => {
            if (
              registrationCheck.type == 'code_write' &&
              md5(req.body.password) === registrationCheck.password
            ) {
              if (registrationCheck.code === req.body.code) {
                db.redis
                  .hset(redisEmail, { type: 'history_read' })
                  .then(() => {
                    res.send({
                      success: true,
                    })
                  })
                  .catch((error) => {
                    logger.log('error', error)
                  })
              } else {
                res.send({
                  success: false,
                })
              }
            } else {
              res.send({
                success: false,
              })
            }
          })
          .catch((error) => {
            logger.log('error', error)
          })
      } else {
        res.send({
          success: false,
        })
      }
    })
    .catch((error) => {
      logger.log('error', error)
    })
}
