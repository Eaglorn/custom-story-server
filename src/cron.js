const logger = require('../src/logger')
const postgresql = require('../src/dbp')
const DateTime = require('luxon').DateTime

const cronRegistrationCheckDelete = async function () {
  return cron.scheduleJob('*/1 * * * *', function () {
    postgresql.registration_check
      .findMany({
        select: {
          id: true,
        },
        where: {
          date: {
            lte: BigInt(DateTime.now().minus({ hour: 6 }).toMillis()),
          },
        },
      })
      .then((result) => {
        result.forEach((item) => {
          postgresql.registration_check.delete({
            where: {
              id: item.id,
            },
          })
        })
      })
      .catch((err) => {
        logger.error(err)
      })
  })
}

module.exports = { cronRegistrationCheckDelete }
