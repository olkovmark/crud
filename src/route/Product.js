const express = require('express')
const Product = require('../models/Product')
const routerProduct = express.Router()

Product.add(
  new Product(
    'Iphone 11',
    1000,
    `Экран (6.1", OLED (Super Retina XDR), 2532x1170) / Apple A15 Bionic / двойная основная камера: 12 Мп + 12 Мп, фронтальная камера: 12 Мп / 128 ГБ встроенной памяти / 3G / LTE / 5G / GPS / Nano-SIM, eSIM / iOS 15`,
    'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg',
  ),
)
Product.add(
  new Product(
    'Iphone 12',
    1000,
    `Экран (6.1", OLED (Super Retina XDR), 2532x1170) / Apple A15 Bionic / двойная основная камера: 12 Мп + 12 Мп, фронтальная камера: 12 Мп / 128 ГБ встроенной памяти / 3G / LTE / 5G / GPS / Nano-SIM, eSIM / iOS 15`,
    'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg',
  ),
)
Product.add(
  new Product(
    'Iphone 13',
    1000,
    `Экран (6.1", OLED (Super Retina XDR), 2532x1170) / Apple A15 Bionic / двойная основная камера: 12 Мп + 12 Мп, фронтальная камера: 12 Мп / 128 ГБ встроенной памяти / 3G / LTE / 5G / GPS / Nano-SIM, eSIM / iOS 15`,
    'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg',
  ),
)
Product.add(
  new Product(
    'Iphone 14',
    1000,
    `Экран (6.1", OLED (Super Retina XDR), 2532x1170) / Apple A15 Bionic / двойная основная камера: 12 Мп + 12 Мп, фронтальная камера: 12 Мп / 128 ГБ встроенной памяти / 3G / LTE / 5G / GPS / Nano-SIM, eSIM / iOS 15`,
    'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg',
  ),
)
Product.add(
  new Product(
    'Iphone 15',
    1000,
    `Экран (6.1", OLED (Super Retina XDR), 2532x1170) / Apple A15 Bionic / двойная основная камера: 12 Мп + 12 Мп, фронтальная камера: 12 Мп / 128 ГБ встроенной памяти / 3G / LTE / 5G / GPS / Nano-SIM, eSIM / iOS 15`,
    'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg',
  ),
)

routerProduct.get('/product-create', function (req, res) {
  res.render('/product/product-create', {
    style: 'product-create',
  })
})
routerProduct.post('/product-create', function (req, res) {
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
routerProduct.get('/product-edit', function (req, res) {
  const product = Product.getByID(req.query.id)

  res.render('product-edit', {
    style: 'product-edit',
    product,
  })
})
routerProduct.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body
  const response = Product.updateById(id, {
    name,
    price,
    description,
  })

  if (response) {
    info = {
      title: 'Successful execution of the action',
      description: 'Product successfully updated',
    }
  } else {
    info = {
      title: 'Error',
      description: 'Product not update',
    }
  }
  res.render('alert', {
    info,
    style: 'alert',
  })
})
routerProduct.get('/product-delete', function (req, res) {
  const { id } = req.query
  const response = Product.deleteById(id)

  if (response) {
    info = {
      title: 'Successful execution of the action',
      description: 'Product successfully deleted',
    }
  } else {
    info = {
      title: 'Error',
      description: 'Product not delete',
    }
  }

  res.render('alert', {
    info,
    style: 'alert',
  })
})
routerProduct.get('/product-list', function (req, res) {
  res.render('product/product-list', {
    style: 'product/product-list',
    productList: Product.getList(),
  })
})

module.exports = routerProduct
