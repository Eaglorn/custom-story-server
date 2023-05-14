// TODO: Создать таймер удаления просроченных заявок на регистрацию

var logger = require('../logger');
const prisma = require('../db');
var DateTime = require('luxon').DateTime;

prisma.registration_check
  .findMany({
    select: {
      id: true,
    },
    where: {
      date: {
        gte: DateTime.now().plus({ hour: 1 }).toMillis(),
      },
    },
  })
  .then((results) => {
    results.forEach((result) => {
      prisma.registration_check
        .delete({
          where: {
            id: result.id,
          },
        })
        .catch((err) => {
          logger.error(err);
        })
    });
  })
  .catch((err) => {
    logger.error(err);
  });
