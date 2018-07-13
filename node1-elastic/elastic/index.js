'use strict'

const articleApi = require('./article-api')

module.exports = {
  getArticleById: articleApi.get
}
