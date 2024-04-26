let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
const fs = require('fs');
let httpsServer = require('https').createServer(
{
	key: fs.readFileSync('c:/certs/key.pem'),
    cert: fs.readFileSync('c:/certs/cert.pem'),
}, app);

let { Server } = require('socket.io');
let uuid = require('uuid');

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

let io = new Server(httpsServer, {
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

let User = require('./api/user');
app.post('/api/user/authorization', User.Authorization);
app.post('/api/user/registration', User.Registration);
app.post('/api/user/registration/check', User.RegistrationCheck);
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
})

httpsServer.listen(443, "195.133.196.229", function () {
	console.log(`Server listens https://195.133.196.229:443`);
});
