const logger = require('../../../logger')
const prisma = require('../../../db')
const md5 = require('md5')

module.exports = async function (req, res) {
  try {
    const registrationCheck = await prisma.registration_check.findFirst({
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
    if (registrationCheck != null) {
      if (
        registrationCheck.code === req.body.code &&
        md5(req.body.password) === registrationCheck.password
      ) {
        await prisma.registration_check.update({
          where: {
            id: registrationCheck.id,
          },
          data: {
            type: 'history_read',
          },
        })
        res.send({
          success: true,
        })
      } else {
        res.send({
          success: false,
        })
      }
    } else {
      res.send({
        success: false,
      })
    }
  } catch (error) {
    logger.error(error)
  }
}
