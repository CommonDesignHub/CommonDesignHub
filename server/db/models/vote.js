const {INTEGER, STRING, TEXT, ENUM} = require('sequelize')
const db = require('../db')

module.exports = db.define('vote', {
  dir: INTEGER,
})
