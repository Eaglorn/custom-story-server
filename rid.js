const logger = require('./src/logger')
const express = require('express')
const helmet = require('helmet')
const app = express()

app.use(function (req, res, next) {
  let error = null
  try {
    decodeURIComponent(req.path)
  } catch (e) {
    error = e
  }
  if (error) {
    logger.log('error', error)
    return res.redirect('/')
  }
  next()
})

app.use(helmet())

const httpServer = require('http').createServer(app)

app.get('/*', (req, res) => {
  res.redirect('https://customstory.online')
})

httpServer.listen(80, '195.133.196.229', function () {})
