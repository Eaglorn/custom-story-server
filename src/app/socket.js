const logger = require('../../logger');

let countPlayers = 0;

module.exports = function (io) {
  console.log(countPlayers);
  try {
    io.on('connection', async (socket) => {
      console.log(countPlayers);
      countPlayers++;
      console.log(countPlayers);
      socket.emit('ChangeCountPlayer', { countPlayers: countPlayers });
      try {
        socket.on('disconnect', (reason) => {
          console.log(countPlayers);
          countPlayers--;
          console.log(countPlayers);
          socket.emit('ChangeCountPlayer', { countPlayers: countPlayers });
        });
      } catch (err) {
        logger.error(err);
      }
    });
  } catch (err) {
    logger.error(err);
  }
};
