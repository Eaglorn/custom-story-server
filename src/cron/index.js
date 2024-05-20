const cronRegistrationCheckDelete = async function () {
  return cron.scheduleJob('*/1 * * * *', function () {})
}

module.exports = { cronRegistrationCheckDelete }
