'use stric'

const esClient = require('./es-connection')
const debug = require('debug')('elastic')

async function getHealth () {
  try {
    const response = await esClient.cluster.health({})
    debug(`ElasticSearch health: ${response}`)
    return response
  } catch (error) {
    console.error(error)
    throw Error(error)
  }
}

module.exports.getHealth = getHealth

async function indexExists (indexName) {
  try {
    const response = await esClient.indices.exists({index: indexName})
    debug(`index ${indexName}: ${response}`)
    return response
  } catch (error) {
    console.error(error)
    throw Error(error)
  }
}

module.exports.indexExists = indexExists
