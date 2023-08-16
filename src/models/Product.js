class Product {
  static #list = []
  constructor(name, price, description, img) {
    this.name = name
    this.price = price
    this.description = description
    this.id = 1
    // this.id = Math.floor(Math.random() * 1000000000)
    this.img = img
    this.amount = 3
  }

  static getList() {
    return this.#list
  }
  static getRecommendationList(amount) {
    return this.#list.slice(0, amount)
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

module.exports = Product
