const md5 = require('md5');
const logger = require('../../logger');
const prisma = require('../../db');

module.exports = async function (req, res) {
  try {
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
      select: { password: true, type: true },
    });
    if (user != null) {
      if (md5(req.body.password) === user.password) {
        res.send({ success: true, registration: false, type: user.type });
      } else {
        res.send({
          success: false,
          registration: false,
          email: true,
          password: false,
        });
      }
    } else {
      const registrationCheck = await prisma.user.findFirst({
        where: { email: req.body.email },
        select: { password: true, type: true },
      });
      if (registrationCheck != null) {
        if (md5(req.body.password) === registrationCheck.password) {
          res.send({
            success: true,
            registration: true,
            type: registrationCheck.type,
          });
        } else {
          res.send({
            success: false,
            registration: true,
            email: true,
            password: false,
          });
        }
      } else {
        res.send({
          success: false,
          registration: false,
          email: false,
        });
      }
    }
  } catch (error) {
    logger.error(error);
  }
};
