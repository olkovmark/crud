const express = require('express')

const router = express.Router()

// ===============================
class User {
  static #list = []
  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => this.#list

  static getById = (id) => {
    return this.#list.find((user) => user.id === id)
  }

  static delete = (id) => {
    this.#list = this.#list.filter((user) => user.id !== id)
    return true
  }

  static updateEmail(id, newEmail, password) {
    const user = this.#list.find((user) => user.id === id)
    if (!user) return 'User not found'

    if (user.password !== password)
      return 'Password is incorrect'

    user.email = newEmail
    return 'Email update'
  }
}

// ===============================

router.get('/', function (req, res) {
  User.add(new User('123@123', '123', '123'))
  const list = User.getList()
})

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
    return this.#list.find((product) => product.id == id)
  }

  static updateById(id, { price, name, description }) {
    const product = this.getByID(id)
    if (name) product.name = name
    if (price) product.price = price
    if (description) product.description = description

    return product
  }

  static deleteById(id) {
    const index = this.#list.findIndex(
      (product) => product.id == id,
    )
    if (index < 0) return false
    this.#list.splice(index, 1)
    return true
  }
}

for (let i = 0; i < 5; i++) {
  Product.add(
    new Product(
      'Iphone10',
      1234,
      'Description product ,Description product,Description product',
    ),
  )
  Product.add(new Product('Iphone10', 1234, 'onproduct'))
}

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
router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body
  const user = new User(email, login, password)

  User.add(user)

  res.render('success-info', {
    style: 'success-info',
    info: 'User is created',
  })
})

router.post('/update-email', function (req, res) {
  const { id, email, password } = req.body

  const response = User.updateEmail(
    Number(id),
    email,
    password,
  )
  res.render('success-info', {
    style: 'success-info',
    info: response,
  })
})

router.get('/product-list', function (req, res) {
  res.render('product-list', {
    style: 'product-list',
    productList: Product.getList(),
  })
})

router.get('/product-edit', function (req, res) {
  const product = Product.getByID(req.query.id)

  console.log('id', req.query.id, ':', product.id)
  console.log(product)
  console.log(Product.getList())
  res.render('product-edit', {
    style: 'product-edit',
    product,
  })
})
router.post('/product-edit', function (req, res) {
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

router.get('/product-delete', function (req, res) {
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

module.exports = router
