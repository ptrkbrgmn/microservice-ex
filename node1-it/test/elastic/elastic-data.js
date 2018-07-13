'use strict'

const fs = require('fs')
const assert = require('assert')
const esClient = require('./es-connection')

async function bulkIndex (index, type, data) {
  let bulkBody = []
  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id
      }
    })
    bulkBody.push(item)
  })
  console.log(`bulkBody.length: ${bulkBody.length}`)
  try {
    const response = await esClient.bulk({body: bulkBody})
    let errorCount = 0
    response.items.forEach(item => {
      if (item.index && item.index.error) {
        console.log(++errorCount, item.index.error)
      }
    })
    console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`)
    return response
  } catch (err) {
    console.error(err)
    throw Error(err)
  }
}

function indexArticles (pathToFile) {
  assert(typeof pathToFile === 'string', 'pathtToFile must be a string')
  const articlesRaw = fs.readFileSync(pathToFile)
  const articlesJson = JSON.parse(articlesRaw)
  console.log(`${articlesJson.length} items parsed from data file`)
  return bulkIndex('library', 'article', articlesJson)
}

module.exports.indexArticles = indexArticles

function close () {
  esClient.close()
}

module.exports.close = close
