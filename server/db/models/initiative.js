const Sequelize = require('sequelize')
const db = require('../db')

const Initiative = db.define('initiative', {
  description: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  }
})

module.exports = Initiative
