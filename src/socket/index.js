const db = require('../db')

const metricUserOnlineCount = 'metric:user:online:count'

await db.redis.set(metricUserOnlineCount, 0)

module.exports = async function (io) {
  io.on('connection', async (socket) => {
    await db.redis.incr(metricUserOnlineCount)
    socket.emit('GetPlayersCount', {
      value: await db.redis.get(metricUserOnlineCount),
    })
    socket.broadcast.emit('AddPlayersCount')

    socket.on('disconnect', (reason) => {
      db.redis.decr(metricUserOnlineCount)
      io.sockets.emit('RemovePlayersCount')
    })
  })
}
