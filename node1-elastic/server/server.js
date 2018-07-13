'use strict'

const restify = require('restify')
const articleApi = require('../elastic/article-api')
const esHealth = require('../elastic/es-healthcheck')

async function healthcheck (req, res, next) {
  try {
    const livingEsConnection = await esHealth.esClientConnected()
    const libraryIndexExists = await esHealth.indexExists('')

    const result = {
      'livingEsConnection': livingEsConnection,
      'libraryIndexExists': libraryIndexExists
    }
    res.send(result)
    next()
  } catch (err) {
    console.error(err)
    next(err)
  }
}

async function articleRespond (req, res, next) {
  try {
    const article = await articleApi.get(req.params.id)
    res.send(article)
    next()
  } catch (err) {
    console.error(err)
    next(err)
  }
}

function start () {
  var server = restify.createServer()
  server.get('/articles/:id', articleRespond)
  server.get('/healthcheck/', healthcheck)
  server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url)
  })
}

module.exports.start = start
