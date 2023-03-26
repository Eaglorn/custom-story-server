var md5 = require('md5');
var uuid = require('uuid');
var logger = require('../../logger');
const utilConst = require('../../util');
const prisma = require('../../db');

module.exports = async function (req, res) {
  const redisIsUserRegistration = await redis.get(req.body.email);

  if (redisIsUserRegistration.lenght > 0) {
    res.send({
      registration_email: true,
    });
  } else {
    registration = false;
    prisma.user
      .findFirst({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (user === null) {
          const pass = md5(req.body.password);
          // FIX Заменить redis на postgresql

          redis.set(
            req.body.email,
            { pass: pass, code: uuid.v4() },
            utilConst.socketExpireKey
          );
          res.send({
            registration_email: false,
            success: true,
          });
        } else {
          res.send({
            registration_email: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        logger.error(err);
      });
  }
};
