const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/upload', require('./image_upload'))
router.use('/category', require('./category'))
router.use('/comment', require('./comment'))
router.use('/item', require('./item'))
router.use('/project', require('./project'))
router.use('/vote', require('./vote'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
