const db = require('../db')

const metricUserOnlineCount = 'metric:user:online:count'

module.exports = function (io) {
  io.on('connection', (socket) => {
    db.redis.incr(metricUserOnlineCount)
    db.redis.get(metricUserOnlineCount).then((result) => {
      socket.emit('GetPlayersCount', {
        value: result,
      })
    })

    socket.broadcast.emit('AddPlayersCount')

    socket.on('disconnect', (reason) => {
      db.redis.decr(metricUserOnlineCount)
      io.sockets.emit('RemovePlayersCount')
    })
  })
}
