class Purchase {
  static purchases = []
  constructor(product, client) {
    this.product = product
    this.client = client
    // this.id = Math.floor(Math.random() * 10000000)
    this.id = 2
  }

  static getById(id) {
    return this.purchases.find((v) => v.id == Number(id))
  }
  static add(...data) {
    this.purchases.push(new Purchase(...data))
  }
  static getList() {
    return this.purchases.reverse()
  }
}

module.exports = Purchase
