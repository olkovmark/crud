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
  console.log(req.body)

  const response = User.updateEmail(
    Number(id),
    email,
    password,
  )

  console.log(response)

  res.render('success-info', {
    style: 'success-info',
    info: response,
  })
})

module.exports = router
