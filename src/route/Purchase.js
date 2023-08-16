const express = require('express')
const Product = require('../models/Product')
const Bonus = require('../models/Bonus')
const Promo = require('../models/Promo')
const Purchase = require('../models/Purchase')
const routerPurchase = express.Router()

routerPurchase.get(
  '/purchase-product',
  function (req, res) {
    const product = Product.getByID(req.query.id)
    const productList = Product.getRecommendationList(3)
    res.render('purchase/purchase-product', {
      style: 'purchase/purchase-product',
      product,
      other: {
        category: 'Смартфони',
        productList,
      },
    })
  },
)
routerPurchase.post(
  '/purchase-create',
  function (req, res) {
    const product = Product.getByID(req.query.id)
    const amount = req.body.amount
    if (product.amount < amount)
      return res.render('alert', {
        info: {
          title: 'Error',
          description: 'Такої кількості на складі нема',
        },
        style: 'alert',
        link: `/purchase-product?=${req.query.id}`,
      })
    const productList = Product.getRecommendationList(3)
    const fullPrice = amount * product.price
    const bonus = Bonus.getBonusSum(fullPrice)
    res.render('purchase/purchase-create', {
      style: 'purchase/purchase-create',
      id: product.id,
      productName: product.name,
      amount,
      fullPrice: amount * product.price,
      bonus,
      delivery: delivery,
      totalPrice: amount * product.price + delivery,
      other: {
        category: 'Смартфони',
        productList,
      },
    })
  },
)

routerPurchase.post('/purchase', function (req, res) {
  const product = Product.getByID(req.query.id)
  const use_bonus = Number(req.body.use_bonus)

  let fullPrice = Number(req.body.fullPrice)

  if (use_bonus) fullPrice -= Bonus.use(use_bonus)
  Bonus.add(req.body.bonus)

  if (req.body.promo)
    fullPrice = Promo.use(req.body.promo, fullPrice)
  const product_info = {
    name: product.name,
    fullPrice,
    bonus: req.body.bonus,
    delivery,
  }
  const user = {
    name: req.body.name,
    second_name: req.body.secondName,
    phone: req.body.phone,
    mail: req.body.mail,
    comment: req.body.comment,
    name: req.body.name,
  }

  Purchase.add(product_info, user)
  return res.render('alert', {
    info: {
      title: 'Успіх',
      description: 'Товар додано',
      link: `/purchase-list`,
    },
    style: 'alert',
  })
})
Purchase.add(
  {
    name: 'Iphone 11',
    fullPrice: 2700,
    bonus: '300',
    delivery: 150,
  },
  {
    name: 'Mark',
    second_name: 'Olkov',
    phone: '089800000',
    mail: '123124@ma.com',
    comment: 'коментар',
  },
)
routerPurchase.get('/purchase-list', function (req, res) {
  const purchaseList = Purchase.getList().map((v) => ({
    id: v.id,
    ...v.product,
  }))
  console.log(purchaseList)
  res.render('purchase/purchase-list', {
    style: 'purchase/purchase-list',
    data: { purchaseList },
  })
})

routerPurchase.post('/purchase-info', function (req, res) {
  const purchase = Purchase.getById(req.query.id)
  console.log(purchase)
  res.render('purchase/purchase', {
    style: 'purchase/purchase',
    data: { purchase },
  })
})

module.exports = routerPurchase

const delivery = 150
