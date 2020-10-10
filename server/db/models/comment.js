const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('comment', {
  content: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  },
  image_url:{
    type: Sequelize.STRING,
  },
})
