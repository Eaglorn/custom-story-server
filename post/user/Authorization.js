var md5 = require("md5");
var Users = require("../../model/Users");
var logger = require("../../logger");

/**
 * @api {post} /user/authorization Авторизация пользователя
 * @apiVersion 0.0.1
 * @apiSampleRequest off
 *
 * @apiName Authorization
 * @apiGroup User
 *
 * @apiParam {String} login Электронный почтовый ящик пользователя
 * @apiParam {String} password Пароль пользователя
 *
 * @apiSuccess {Boolean} success Успешность авторизации
 * @apiSuccess {Boolean} email Успешность ввода электронного почтового ящика
 * @apiSuccess {Boolean} password Успешность ввода пароль
 */

module.exports = async function (req, res) {
  var email = false;
  var password = false;
  Users.findOne({
    attributes: ["password", "type"],
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
