'use strict'

const debug = require('debug')('node1-it')
const elastic = require('../elastic/elastic-data')
const jsonFile = require('jsonfile')
const request = require('supertest')
const superdebug = require('superdebug')
const {waitUntil} = require('../wait-until.js')
const assert = require('assert').strict

Feature('Article API', () => {
  Scenario('Index articles on ElasticSearch and verify a given article is available', () => {
    Given(`there is a bunch of articles indexed on ElasticSearchr`, async () => {
      await waitUntil(async () => {
        const response = await elastic.indexArticles('test/resources/data.json')
        debug(response)
      })
    })

    let response
    When(`fetching an article with id '575084573a2404eec25acdcd'`, async () => {
      const HOST = process.env.NODE1_HOST || 'node1'
      const PORT = process.env.NODE1_PORT || 8080
      await waitUntil(async () => {
        response = await request(`http://${HOST}:${PORT}`)
          .get('/articles/575084573a2404eec25acdcd')
          .use(superdebug())
        assert.equal(response.status, 200, 'Failed to recieve status 200')
      })
    })

    Then(`the correct article should be returned and it should contain the right data`, () => {
      const expectedArticle = jsonFile.readFileSync('test/resources/575084573a2404eec25acdcd.json')
      assert.equal(response.body._id, expectedArticle._id)
      // assert.equal(JSON.stringify(response.body), JSON.stringify(expectedArticle))
    })
  })
})
