'use strict'

const elasticsearch = require('elasticsearch')

const HOST = process.env.ES_HOST || 'elasticsearch'
const PORT = process.env.ES_PORT || 9200

console.log(`Connecting to ElasticSearch on ${HOST}:${PORT}`)

const client = new elasticsearch.Client({
  host: `${HOST}:${PORT}`,
  log: 'error',
  maxRetries: 5
})

// const client = new elasticsearch.Client({
//   // host: `${HOST}:${PORT}`,
//   host: 'localhost:9200',
//   log: 'error',
//   sniffOnStart: true,
//   sniffInterval: 20000,
//   maxRetries: 3,
//   requestTimeout: 10000,
//   deadTimeout: 10000
// })

module.exports = client
