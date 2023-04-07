const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'llewellyn.hoppe@ethereal.email',
    pass: '5fFkB1jT9NwqzP6s4u',
  },
});

module.exports = transporter;
