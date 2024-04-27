var md5 = require('md5');
var uuid = require('uuid');
var logger = require('../../logger');
const prisma = require('../../db');
var DateTime = require('luxon').DateTime;
const mailRegistration = require('../../util/nodemailer');

module.exports = async function (req, res) {
  prisma.registration_check
    .findFirst({
      select: { email: true },
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (user != null) {
        res.send({
          registration_email: true,
        });
      } else {
        prisma.user
          .findFirst({
            select: { email: true },
            where: {
              email: req.body.email,
            },
          })
          .then((user) => {
            if (user != null) {
              res.send({
                registration_email: false,
                success: false,
              });
            } else {
              const code = uuid.v4();
              prisma.registration_check
                .create({
                  data: {
                    email: req.body.email,
                    password: md5(req.body.password),
                    code: code,
                    date: DateTime.now().toMillis(),
                  },
                })
                .then(() => {
                  mailRegistration
                    .sendMail({
                      from: 'registration@customstory.ru',
                      to: req.body.email,
                      subject: 'Регистрация в игре CustomStory',
                      text: 'Ваш код для подтверждения регистрации:', // plain text body
                      html:
                        '<p>Ваш код для подтверждения регистрации<p>' +
                        code +
                        '</p>',
                    })
                    .then(() => {
                      res.send({
                        registration_email: false,
                        success: true,
                      });
                    })
                    .catch((err) => {
                      logger.error(err);
                    });
                })
                .catch((err) => {
                  logger.error(err);
                });
            }
          })
          .catch((err) => {
            logger.error(err);
          });
      }
    })
    .catch((err) => {
      logger.error(err);
    });
};
