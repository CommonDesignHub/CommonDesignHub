const router = require('express').Router()
const {Project, Category, Item, User, Vote, Comment} = require('../db/models')
module.exports = router

var randColor = ()=>{
  const d = 185
  const a = Math.ceil(Math.random() * 80 + d)
  const b = Math.ceil(Math.random() * 80 + d)
  const c = Math.ceil(Math.random() * 80 + d)
  const color = `rgb(${a},${b},${c})`
  return color
}

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/latest', async (req, res, next) => {
  try {
    const projects = await Project.findAll({limit:6, order:[['createdAt', 'DESC']], include:[User, Item]})
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    var {categoryId, itemId, alternateDepartmentName, alternateItemName} = req.body
    var payload = req.body
    payload.userId = req.user.id

    var category
    if(alternateDepartmentName && categoryId==="OTHER"){
      category = await Category.create({title: alternateDepartmentName})
      categoryId = category.id
      payload.categoryId = categoryId
    }

    var item
    if(alternateItemName && itemId==="OTHER"){
      item = await Item.create({title: alternateItemName, categoryId})
      await item.addCategory(category)
      itemId = item.id
      payload.itemId = itemId
    }

    payload.color = randColor()
    const project = await Project.create(payload)
    res.json(project)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/comment', async (req, res, next) => {
  var projectId = req.params.id
  var userId = req.user.id
  try {
    const comment = await Comment.create({userId, projectId, content:req.body.content, image_url:req.body.image_url})

    res.status(204).json(comment)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  var id_param = req.params.id
  try {
    const projects = await Project.findByPk(id_param, {include: [{model: Comment, include:[User]}, Item, User]})
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  var id_param = req.params.id
  try {
    const projects = await Project.findByPk(id_param)
    await projects.update(req.body)
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  var id_param = req.params.id
  try {
    const projects = await Project.findByPk(id_param)
    var ret = await projects.destroy()
    res.json(ret)
  } catch (err) {
    next(err)
  }
})
