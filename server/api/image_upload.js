const multer = require('multer')
const router = require('express').Router()
module.exports = router

const handleError = (err, res) => {
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!')
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now()+ '.' +extension)
  }
})

const upload = multer({storage})

router.post('/', upload.single('files' /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path
    console.log(req.file)
    if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg') {
      res
        .status(200)
        .json(req.file)
        // .contentType('text/plain')
        // .end('File uploaded!')
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
