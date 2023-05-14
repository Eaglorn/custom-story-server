var logger = require('../../logger');
const prisma = require('../../db');
var DateTime = require('luxon').DateTime;

module.exports = async function (req, res) {
  prisma.registration_check
    .findFirst({
      select: {
        code: true,
        password: true,
        id: true,
        email: true,
      },
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
              prisma.registration_check
                .delete({
                  where: {
                    id: result.id,
                  },
                })
                .catch((err) => {
                  logger.error(err);
                });
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
