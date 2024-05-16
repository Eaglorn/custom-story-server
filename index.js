const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const compression = require('compression')
const app = express()
const fs = require('fs')
const eiows = require('eiows')
const httpsServer = require('https').createServer(
  {
    key: fs.readFileSync(
      '/home/customstorydev/custom-story-server/certs/key.pem'
    ),
    cert: fs.readFileSync(
      '/home/customstorydev/custom-story-server/certs/cert.pem'
    ),
  },
  app
)

const { Server } = require('socket.io')
const uuid = require('uuid')

app.use(compression())

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'dist')))

const socketHandler = require('./src/socket')

const io = new Server(httpsServer, {
  cors: {
    origin: '*',
  },
  wsEngine: eiows.Server,
})

io.engine.generateId = (req) => {
  return uuid.v4()
}

const { cronRegistrationCheckDelete } = require('./src/cron')

socketHandler(io)

global.io = io

const User = require('./src/api/user')
app.post('/api/user/authorization', User.Authorization)

const UserRegistration = require('./src/api/user/registration')

app.post('/api/user/registration', UserRegistration.Registration)
app.post('/api/user/registration/check/code', UserRegistration.CheckCode)
app.post('/api/user/registration/history/read', UserRegistration.HistoryRead)
app.post('/api/user/registration/hero/create', UserRegistration.HeroCreate)
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

httpsServer.listen(443, '195.133.196.229', function () {})

const app2 = express()

const httpServer = require('http').createServer(app2)

app2.get('/*', (req, res) => {
  res.redirect('https://customstory.online')
})

httpServer.listen(80, '195.133.196.229', function () {})
