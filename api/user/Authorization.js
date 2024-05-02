const md5 = require('md5');
const logger = require('../../logger');
const prisma = require('../../db');

module.exports = async function (req, res) {
  let email = false;
  let password = false;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
      select: {
        password: true,
        type: true,
      },
    });

    if (user != null) {
      if (md5(req.body.password) === user.password) {
        password = true;
      }
      email = true;
    }
    if (email && password) {
      res.send({ success: true, type: user.type });
    } else {
      res.send({
        success: false,
        email: email,
        password: password,
      });
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
