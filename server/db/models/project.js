const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('project', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  version_control_url: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
