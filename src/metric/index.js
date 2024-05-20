const metric = require('@pm2/io')

metric.init({
  transactions: true,
  http: true,
})

module.exports = metric
