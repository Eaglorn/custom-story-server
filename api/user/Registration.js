var md5 = require('md5');
var uuid = require('uuid');
var logger = require('../../logger');
const prisma = require('../../db');
const moment = require('moment');
const nodemailer = require('../../util/nodemailer');

module.exports = async function (req, res) {
  const email = req.body.email;
  prisma.registration_check
    .findFirst({
      where: {
        email: email,
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
            where: {
              email: email,
            },
          })
          .then((user) => {
            if (user === null) {
              const password = md5(req.body.password);

              const code = uuid.v4();

              prisma.registration_check.create({
                data: {
                  email: email,
                  password: password,
                  code: code,
                  date: moment.now(),
                },
              });

              nodemailer.MailMessage({
                from: 'registration@customstory.ru',
                to: email,
                subject: 'Регистрация в игре CustomStory.',
                html:
                  '<p>Ваш код для подтверждения регистрации</p></br><p>' +
                  code +
                  '</p>',
              });

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
    });
};
