const logger = require('../../../logger');
const prisma = require('../../../db');
const DateTime = require('luxon').DateTime;

prisma.registration_check
  .findMany({
    select: {
      id: true,
    },
    where: {
      date: {
        lte: BigInt(DateTime.now().minus({ hour: 48 }).toMillis()),
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
        });
    });
  })
  .catch((err) => {
    logger.error(err);
  });
