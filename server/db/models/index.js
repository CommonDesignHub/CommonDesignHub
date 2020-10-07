const User = require('./user')
const Category = require('./category')
const Initiative = require('./initiative')
const Project = require('./project')
const Comment = require('./comment')
const Item = require('./item')
const Vote = require('./vote')
const db = require('../db')

ItemCategory = db.define('item_category')

/**
 * Associations
 *
 *    ex. BlogPost.belongsTo(User)
 */

Category.belongsToMany(Item, {through: ItemCategory})
Item.belongsToMany(Category, {through: ItemCategory})

User.hasMany(Comment)
Comment.belongsTo(User)

Project.hasMany(Comment)
Comment.belongsTo(Project)

Project.belongsTo(Item)
Item.hasMany(Project)

User.hasMany(Project)
Project.belongsTo(User)

Vote.belongsTo(Project)
Project.hasMany(Vote)
Vote.belongsTo(User)
User.hasMany(Vote)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Category, Initiative, Project, Comment, Item, Vote
}
