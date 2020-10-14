const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('item', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
})
