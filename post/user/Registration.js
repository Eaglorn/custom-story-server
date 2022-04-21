var md5 = require('md5');
const { User } = require('../../model');
var logger = require('../../logger');

/**
 * @api {post} /user/registration Регистрация пользователя
 * @apiVersion 0.0.1
 * @apiSampleRequest off
 *
 * @apiName Registration
 * @apiGroup User
 *
 * @apiParam {String} email Электронный почтовый ящик
 * @apiParam {String} password Пароль пользователя
 *
 * @apiSuccess {Boolean} success Успешность регистрации
 */

module.exports = async function (req, res) {
  //io.to('all').emit('chat', { name: 'all', text: 'test all emmit' });
  User.findOne({
    attributes: ['email'],
    where: { email: req.body.email },
  })
    .then((user1) => {
      if (user1 === null) {
        Users.create({
          email: req.body.email,
          password: md5(req.body.password),
        })
          .then(() => {
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
