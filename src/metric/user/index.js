const pm2 = require('@pm2/io')

const userOnline = pm2.metric({
  name: 'UserOnlineCount',
  value: 0,
})

module.exports = { userOnline }
