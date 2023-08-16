const express = require('express')

const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    style: 'index',
    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
})

module.exports = router
