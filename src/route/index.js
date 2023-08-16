const express = require('express')
const routerProduct = require('./Product')
const routerPurchase = require('./Purchase')
const router = express.Router()

// ===============================

// ===============================

router.use(routerProduct)
router.use(routerPurchase)
router.get('/', function (req, res) {
  res.render('index', {
    style: 'index',
  })
})

module.exports = router
