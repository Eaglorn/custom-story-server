var md5 = require('md5');
var logger = require('../../logger');
const redis = require('../../redis');
const utilConst = require('../../util');
const prisma = require('../../db');

module.exports = async function (req, res) {
  var email = false;
  var password = false;
  prisma.user
    .findFirst({
      where: {
        email: req.body.email,
      },
      select: {
        password: true,
        type: true,
      },
    })
    .then((user) => {
      if (user != null) {
        if (md5(req.body.password) === user.password) {
          password = true;
        }
        email = true;
      }
      if (email && password) {
        redis.set(
          req.body.socket,
          { auth: true, type: user.type },
          'ex',
          utilConst.socketExpireKey
        );
        res.send({ success: true, type: user.type });
      } else {
        res.send({
          success: false,
          email: email,
          password: password,
        });
      }
    })
    .catch((err) => {
      logger.error(err);
    });
};
