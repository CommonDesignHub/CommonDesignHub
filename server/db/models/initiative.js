const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('initiative', {
  description: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  }
})
