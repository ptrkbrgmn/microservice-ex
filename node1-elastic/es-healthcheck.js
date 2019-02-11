'use strict'

const esClient = require('./es-connection')

async function esClientConnected () {
  try {
    const response = await esClient.ping({requestTimeout: 1000})
    console.log(response)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

async function indexExists (indexName) {
  try {
    const response = await esClient.indices.exists({index: indexName})
    console.log(response)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports.esClientConnected = esClientConnected
module.exports.indexExists = indexExists
