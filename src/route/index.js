const express = require('express')

const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    style: 'index',
  })
})
router.get('/product-create', function (req, res) {
  res.render('product-create', {
    style: 'index',
  })
})

router.post('/product-create', function (req, res) {
  res.render('alert', {
    style: 'index',
  })
})

module.exports = router
