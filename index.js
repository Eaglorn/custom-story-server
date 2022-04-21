var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var httpServer = require('http').createServer(app);
const { Server } = require('socket.io');
const uuid = require('uuid');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

var io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.engine.generateId = (req) => {
  return uuid.v4();
};

io.on('connection', (socket) => {
  socket.join('all');
});

global.io = io;

app.post('/api/user/authorization', require('./post/user/Authorization'));
app.post('/api/user/registration', require('./post/user/Registration'));

httpServer.listen(3000);
