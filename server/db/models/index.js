const User = require('./user')
const Category = require('./category')
const Initiative = require('./initiative')
const Project = require('./project')
const Comment = require('./comment')
const Item = require('./item')
const db = require('../db')

ItemCategory = db.define('item_category')

Category.hasMany(Item)
Item.belongsToMany(Category, {through: ItemCategory})

User.hasMany(Comment)
Comment.belongsTo(User)
Initiative.hasMany(Comment)
Comment.belongsTo(Initiative)
Project.hasMany(Comment)
Comment.belongsTo(Project)

Project.belongsTo(Item)
Initiative.belongsTo(Item)
Item.hasOne(Initiative)
Item.hasMany(Project)

User.hasMany(Project)
User.hasMany(Initiative)
Project.belongsTo(User)
Initiative.belongsTo(User)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User
}
