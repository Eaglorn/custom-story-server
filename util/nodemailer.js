const nodemailer = require('nodemailer');

const mailRegistration = nodemailer.createTransport({
  host: 'mail.customstory.ru',
  port: 587,
  secure: false,
  auth: {
      user: 'registration@customstory.ru',
      pass: '1352461324qQ'
  }
});

module.exports = mailRegistration;
