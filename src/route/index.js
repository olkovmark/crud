const express = require('express')

const router = express.Router()

class Product {
  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.floor(Math.random() * 1000000000)
    this.createDate = new Date(Date.now())
  }

  static #list = []

  static getList() {
    return this.#list
  }
  static add(product) {
    this.#list.push(product)
    return 'Added'
  }

  static getByID(id) {
    return this.#list.find((product) => (product.id = id))
  }

  static updateById(id, { price, name, description }) {
    const product = this.getByID(id)
    if (name) product.name = name
    if (price) product.price = price
    if (description) product.description = description

    return product
  }

  static deleteById(id) {
    const index = this.#list.indexOf(
      (product) => product.id === id,
    )
    this.#list.splice(index, 1)
    return true
  }
}

router.get('/', function (req, res) {
  res.render('index', {
    style: 'index',
  })
})
router.get('/product-create', function (req, res) {
  res.render('product-create', {
    style: 'product-create',
  })
})

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  const response = Product.add(
    new Product(name, price, description),
  )
  let info
  if (response) {
    info = {
      title: 'Successful execution of the action',
      description: 'Product successfully added',
    }
  } else {
    info = {
      title: 'Error',
      description: 'Product not added',
    }
  }

  res.render('alert', {
    info,
    style: 'alert',
  })
})

module.exports = router
