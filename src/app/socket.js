const logger = require('../../logger');

module.exports = function (io) {
  io.on('connection', async (socket) => {
    socket.emit('GlobalCountAddPlayer');
  });

  io.on('disconnect', async (socket) => {
    socket.emit('GlobalCountRemovePlayer');
  });
};
