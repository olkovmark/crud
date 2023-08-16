class Bonus {
  static bonus = 0
  static rate = 0.1

  static getBonusSum(sum) {
    return sum * this.rate
  }

  static add(bonus) {
    this.bonus += Number(bonus)
  }
  static get bonus() {
    return this.bonus
  }
  static use(bonus) {
    if (bonus < this.bonus) {
      this.bonus -= Number(bonus)
      return Number(bonus)
    }
    bonus = this.bonus
    this.bonus = 0
    return bonus
  }
}

module.exports = Bonus
