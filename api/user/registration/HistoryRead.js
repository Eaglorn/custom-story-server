const logger = require('../../../logger');
const prisma = require('../../../db');
const md5 = require('md5');

module.exports = async function (req, res) {
  try {
    const registrationCheck = await prisma.registration_check.findFirst({
      select: {
        id: true,
        password: true,
        email: true,
      },
      where: {
        email: req.body.email,
      },
    });
    if (registrationCheck != null) {
      if (md5(req.body.password) === registrationCheck.password) {
        await prisma.registration_check.update({
          where: {
            id: registrationCheck.id,
          },
          data: {
            type: 'hero_create',
          },
        });
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
