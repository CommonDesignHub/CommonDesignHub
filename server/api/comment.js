const router = require('express').Router()
const {Comment} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.findAll()
    res.json(comments)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body)
    res.json(comment)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
	var id_param = req.params.id
  try {
    const comment = await Comment.findByPk(id_param)
    res.json(comment)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
	var id_param = req.params.id
  try {
    const comment = await Comment.findByPk(id_param)
    await comment.update(req.body)
    res.json(comment)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
	var id_param = req.params.id
  try {
    const comment = await Comment.findByPk(id_param)
    var ret = await comment.destroy()
    res.json(ret)
  } catch (err) {
    next(err)
  }
})
