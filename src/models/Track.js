class Track {
  static #list = []
  constructor(name, author, image) {
    this.id = Math.floor(Math.random() * 100000)
    this.name = name
    this.author = author
    this.image = image
  }

  static create(name, author, image) {
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }

  static getById(id) {
    return this.#list.find((v) => v.id === id) || null
  }

  static getList() {
    return this.#list.reverse()
  }
}

Track.create(
  'The Oh Hellos',
  'Soldier, Poet, King',
  'https://picsum.photos/100/100',
)
Track.create(
  'Cure For Me',
  'Aurora',
  'https://picsum.photos/100/100',
)
Track.create(
  'Midnight',
  'Caravan Palace',
  'https://picsum.photos/100/100',
)
Track.create(
  'The Oh Hellos2',
  'Soldier, Poet, King',
  'https://picsum.photos/100/100',
)
Track.create(
  'Cure For Me2',
  'Aurora',
  'https://picsum.photos/100/100',
)
Track.create(
  'Midnight2',
  'Caravan Palace',
  'https://picsum.photos/100/100',
)

module.exports = Track
