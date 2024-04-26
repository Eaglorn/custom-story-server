const logger = require('../../logger');

let countPlayers = 0;

module.exports = function (io) {
  io.on('connection', async (socket) => {
    countPlayers++;
    socket.emit('ChangeCountPlayer', {countPlayers: countPlayers});

    socket.on("disconnect", (reason) => {
      countPlayers--;
      socket.emit('ChangeCountPlayer', {countPlayers: countPlayers});
    });
  });
};
