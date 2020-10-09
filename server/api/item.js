const router = require('express').Router()
const {Item, Project, Vote, Category} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    var {category_id, category_name, initiative_name} = req.body
    var category
    if(category_name&&category_id==="OTHER"){
      category = await Category.create({title: category_name})
    }else{
      category = await Category.findByPk(category_id)
    }

    const item = await Item.create({title:initiative_name})
    await item.addCategory(category)

    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  var id_param = req.params.id
  try {
    const items = await Item.findOne({where: {id:id_param}, include:[{model: Project, include: [Vote]}]})
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  var id_param = req.params.id
  try {
    const items = await Item.findByPk(id_param)
    await items.update(req.body)
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  var id_param = req.params.id
  try {
    const items = await Item.findByPk(id_param)
    var ret = await items.destroy()
    res.json(ret)
  } catch (err) {
    next(err)
  }
})
