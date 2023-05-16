const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'reggie.greenholt18@ethereal.email',
      pass: 'xwCBb6pTpCUE5AyaKE'
  }
});

module.exports = transporter;
