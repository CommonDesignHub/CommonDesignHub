const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Project
