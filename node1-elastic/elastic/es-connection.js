'use strict'

var elasticsearch = require('elasticsearch')

const HOST = process.env.ES_HOST || 'elasticsearch'
const PORT = process.env.ES_PORT || 9200

var client = new elasticsearch.Client({
  host: `${HOST}:${PORT}`,
  log: 'debug',
  maxRetries: 5,
  requestTimeout: 5000,
  deadTimeout: 5000
})

module.exports = client
