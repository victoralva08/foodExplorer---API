const knexConfig = require('../../../knexfile')

const knen = require('knex')

const connection = knex(knexConfig)
module.exports = connection