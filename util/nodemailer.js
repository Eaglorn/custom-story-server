const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'burley66@ethereal.email',
    pass: 'tQafueRTZ6NfWb7yQ2',
  },
});

module.exports = transporter;
