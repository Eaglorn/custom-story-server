const md5 = require('md5');
const uuid = require('uuid');
const logger = require('../../../logger');
const prisma = require('../../../db');
const DateTime = require('luxon').DateTime;
const mailRegistration = require('../../../util/nodemailer');

module.exports = async function (req, res) {
  try {
    let user = await prisma.user.findFirst({
      where: { email: req.body.email },
      select: { email: true },
    });
    if (user != null) {
      res.send({
        registration: false,
        email: false,
      });
    } else {
      const registrationCheck = await prisma.registration_check.findFirst({
        where: { email: req.body.email },
        select: { email: true, password: true, type: true },
      });
      if (registrationCheck != null) {
        if (md5(req.body.password) === registrationCheck.password) {
          res.send({
            success: true,
            registration: true,
            type: registrationCheck.type,
          });
        } else {
          res.send({ success: false, registration: true, email: true, password: false });
        }
      } else {
        const code = uuid.v4();
        await prisma.registration_check.create({
          data: {
            email: req.body.email,
            password: md5(req.body.password),
            code: code,
            date: DateTime.now().toMillis(),
            type: 'write_code',
          },
        });
        await mailRegistration.sendMail({
          from: 'registration@customstory.online',
          to: req.body.email,
          subject: 'Регистрация в игре CustomStory',
          text: 'Ваш код для подтверждения регистрации:',
          html: '<p>Ваш код для подтверждения регистрации<p>' + code + '</p>',
        });
        res.send({
          success: true,
        });
      }
    }
  } catch (error) {
    logger.error(error);
  }
};
