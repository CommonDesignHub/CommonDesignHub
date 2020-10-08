const router = require('express').Router()
const {Project} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const projects = await Project.create(req.body)
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  var id_param = req.params.id
  try {
    const projects = await Project.findByPk(id_param)
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
