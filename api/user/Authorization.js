var md5 = require('md5');
const { User } = require('../../model');
var logger = require('../../logger');
const redis = require('../../redis');
const utilConst = require('../../util');

module.exports = async function (req, res) {
  var email = false;
  var password = false;
  User.findOne({
    attributes: ['password', 'type'],
    where: {
      email: req.body.email,
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
