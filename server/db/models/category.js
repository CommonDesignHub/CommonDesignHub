const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('category', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})
