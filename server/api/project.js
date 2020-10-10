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

router.get('/newcreation', async (req, res, next) => {
  try {
    const projects = await Project.findAll({limit:10, order:[['createdAt', 'DESC']]})
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/newvote', async (req, res, next) => {
  try {
    const projects = await Project.findAll({limit:10, order:[['createdAt', 'DESC']]})
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/newcomment', async (req, res, next) => {
  try {
    const projects = await Project.findAll({limit:10, order:[['createdAt', 'DESC']]})
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    var {categoryId, itemId, alternateDepartmentName, alternateItemName} = req.body
    var payload = req.body

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
    console.log(payload)
    const project = await Project.create(payload)
    res.json(project)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  var id_param = req.params.id
  try {
    const projects = await Project.findByPk(id_param, {include: [Item, User]})
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
