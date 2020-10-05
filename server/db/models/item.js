const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Item
