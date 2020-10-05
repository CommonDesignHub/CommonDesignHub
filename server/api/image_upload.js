const multer = require('multer')
const router = require('express').Router()
module.exports = router

const handleError = (err, res) => {
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!')
}

const upload = multer({
  dest: 'uploads/'
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
})

router.post(
  '/',
  upload.single('files' /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path
    if (req.file.mimetype === 'image/png') {
      res
        .status(200)
        .contentType('text/plain')
        .end('File uploaded!')
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res)

        res
          .status(403)
          .contentType('text/plain')
          .end('Only .png files are allowed!')
      })
    }
  }
)
