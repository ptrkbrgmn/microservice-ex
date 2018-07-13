'use strict'

const esClient = require('./es-connection')

async function get (id) {
  try {
    const article = await esClient.get({
      index: 'library',
      type: 'article',
      id: id
    })
    console.log(`Successfully retrieved article witn id ${article._id}`)
    return article // will be wrapped in Promise
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

module.exports.get = get
