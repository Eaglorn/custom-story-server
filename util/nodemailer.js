const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'connect.smtp.bz',
  port: 587,
  secure: true,
  auth: {
      user: 'registration@customstory.ru',
      pass: '1352461324qQ'
  }
});

module.exports = transporter;
