let express = require('express');
let app = express();

let httpServer = require('http').createServer(app);

app.get('/*', (req, res) => {
  res.redirect('https://customstory.online');
});

httpServer.listen(443, '195.133.196.229', function () {});
