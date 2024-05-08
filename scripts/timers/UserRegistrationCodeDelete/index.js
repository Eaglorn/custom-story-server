const logger = require('../../../logger');
const prisma = require('../../../db');
const DateTime = require('luxon').DateTime;

try {
  const registrations = await prisma.registration_check.findMany({
    select: {
      id: true,
    },
    where: {
      date: {
        lte: BigInt(DateTime.now().minus({ hour: 6 }).toMillis()),
      },
    },
  });

  registrations.forEach((result) => {
    prisma.registration_check.delete({
      where: {
        id: result.id,
      },
    });
  });
} catch (err) {
  logger.error(err);
}
