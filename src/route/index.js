const express = require('express')

const routerProduct = require('./Product')
const routerPurchase = require('./Purchase')
const spotifyRouter = require('./spotify')
const router = express.Router()


router.use(routerProduct)
router.use(routerPurchase)
router.use(spotifyRouter)
router.get('/', function (req, res) {
  res.render('index', {
    style: 'index',
  })
})

module.exports = router
