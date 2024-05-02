let logger = require('../../../logger');
const prisma = require('../../../db');

module.exports = async function (req, res) {
  try {
    const registrationCheck = prisma.registration_check.findFirst({
      select: {
        code: true,
        password: true,
        id: true,
        email: true,
      },
      where: {
        email: req.body.email,
      },
    });

    if (registrationCheck != null) {
      if (registrationCheck.code === req.body.code) {
        prisma.registration_check.update({
          where: {
            id: registrationCheck.id,
          },
          data: {
            status: 'history_read',
          },
        });

        res.send({
          success: true,
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
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
