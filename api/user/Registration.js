var md5 = require('md5');
const { User } = require('../../model');
var logger = require('../../logger');
const redis = require('../../redis');
const utilConst = require('../../util');

module.exports = async function (req, res) {
  //io.to('all').emit('chat', { name: 'all', text: 'test all emmit' });
  User.findOne({
    attributes: ['email'],
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user === null) {
        User.create({
          email: req.body.email,
          password: md5(req.body.password),
        })
          .then(() => {
            redis.set(
              req.body.socket,
              { auth: true, type: 'user' },
              'ex',
              utilConst.socketExpireKey
            );
            res.send({
              success: true,
            });
          })
          .catch((err) => {
            logger.error(err);
          });
      } else {
        res.send({
          success: false,
        });
      }
    })
    .catch((err) => {
      logger.error(err);
    });
};
