class Promo {
  static promos = []

  static add(promo, rate) {
    this.promos.push({ promo, rate })
  }

  static use(promo, sum) {
    promo = this.promos.find((v) => v.promo === promo)
    if (promo) return sum * promo.rate

    return sum
  }
}

Promo.add('asdqwer', 0.9)
Promo.add('asdf', 0.8)
Promo.add('zxcv', 0.7)

module.exports = Promo
