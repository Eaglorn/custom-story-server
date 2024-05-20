const logger = require('./logger')
const io = require('@pm2/io')

let PlayersCount = 0

const userOnline = io.metric({
  name: 'UserOnline',
})

module.exports = function (io) {
  io.on('connection', async (socket) => {
    PlayersCount++
    socket.emit('GetPlayersCount', { value: PlayersCount })
    socket.broadcast.emit('AddPlayersCount')
    userOnline.set(PlayersCount)

    socket.on('disconnect', (reason) => {
      PlayersCount--
      io.sockets.emit('RemovePlayersCount')
      userOnline.set(PlayersCount)
    })
  })
}
