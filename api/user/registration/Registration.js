const md5 = require('md5');
const uuid = require('uuid');
const logger = require('../../../logger');
const prisma = require('../../../db');
const DateTime = require('luxon').DateTime;
const mailRegistration = require('../../../util/nodemailer');

module.exports = async function (req, res) {
  try {
    const registrationCheck = await prisma.registration_check.findFirst({
      select: { email: true },
      where: {
        email: req.body.email,
      },
    });
    if (registrationCheck != null) {
      res.send({
        registration_email: true,
      });
    } else {
      let user = prisma.user.findFirst({
        select: { email: true },
        where: {
          email: req.body.email,
        },
      });
      if (user != null) {
        res.send({
          registration_email: false,
          success: false,
        });
      } else {
        const code = uuid.v4();
        prisma.registration_check.create({
          data: {
            email: req.body.email,
            password: md5(req.body.password),
            code: code,
            date: DateTime.now().toMillis(),
          },
        });
        mailRegistration.sendMail({
          from: 'registration@customstory.online',
          to: req.body.email,
          subject: 'Регистрация в игре CustomStory',
          text: 'Ваш код для подтверждения регистрации:',
          html: '<p>Ваш код для подтверждения регистрации<p>' + code + '</p>',
        });
        res.send({
          registration_email: false,
          success: true,
        });
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
