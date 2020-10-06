const router = require('express').Router()
const {Vote} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const votes = await Vote.findAll()
    res.json(votes)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const votes = await Vote.create(req.body)
    res.json(votes)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
	var id_param = req.params.id
  try {
    const votes = await Vote.findOne(id_param)
    res.json(votes)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
	var id_param = req.params.id
  try {
    const votes = await Vote.findOne(id_param)
    await votes.update(req.body)
    res.json(votes)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
	var id_param = req.params.id
  try {
    const votes = await Vote.findOne(id_param)
    var ret = await votes.destroy()
    res.json(ret)
  } catch (err) {
    next(err)
  }
})
