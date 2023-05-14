const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'kayli27@ethereal.email',
    pass: 'GE4jcjJMvuDn4dMxqk'
  },
});

module.exports = transporter;
