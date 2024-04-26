const logger = require('../../logger');

let countPlayers = 0;

module.exports = function (io) {
  io.on('connection', async (socket) => {
    console.log(countPlayers);
    countPlayers++;
    console.log(countPlayers);
    socket.emit('ChangeCountPlayer', {countPlayers: countPlayers});

    socket.on("disconnect", (reason) => {
      console.log(countPlayers);
      countPlayers--;
      console.log(countPlayers);
      socket.emit('ChangeCountPlayer', {countPlayers: countPlayers});
    });
  });


};
