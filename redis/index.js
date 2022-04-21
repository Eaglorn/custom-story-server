const ClientRedis = require('ioredis');
const redis = new ClientRedis({
  port: 6379,
  host: '127.0.0.1',
  //username: 'default',
  //password: 'my-top-secret',
  db: 0,
});
var logger = require('../logger');

module.exports = redis;
