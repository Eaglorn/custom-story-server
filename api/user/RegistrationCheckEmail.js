var logger = require('../../logger');
const prisma = require('../../db');
var DateTime = require('luxon').DateTime;

module.exports = async function (req, res) {
  prisma.registration_check
    .findFirst({
      where: {
        email: req.body.email,
      },
    })
    .then((result) => {
      if (result != null) {
        if (result.code === req.body.code) {
          prisma.user
            .create({
              data: {
                email: result.email,
                password: result.password,
                type: 'user',
              },
            })
            .then(() => {
              res.send({
                success: true,
              });
            })
            .catch((err) => {
              logger.error(err);
            });
        } else {
          res.send({
            success: false,
          });
        }
      } else {
        res.send({
          success: false,
        });
      }
    });
};
