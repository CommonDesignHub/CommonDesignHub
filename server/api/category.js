const router = require('express').Router()
const {Category} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.json(category)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
	var id_param = req.params.id
  try {
    const category = await Category.findOne(id_param)
    res.json(category)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
	var id_param = req.params.id
  try {
    const category = await Category.findOne(id_param)
    await category.update(req.body)
    res.json(category)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
	var id_param = req.params.id
  try {
    const category = await Category.findOne(id_param)
    var ret = await category.destroy()
    res.json(ret)
  } catch (err) {
    next(err)
  }
})
