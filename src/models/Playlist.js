const Track = require('./Track')

class Playlist {
  static #list = []
  constructor(name) {
    this.id = Math.floor(Math.random() * 100000)
    this.name = name
    this.tracks = []
    this.image = 'https://picsum.photos/100/100'
  }

  static create(name) {
    const newPlaylist = new Playlist(name)
    this.#list.push(newPlaylist)
    return newPlaylist
  }

  static getList() {
    return this.#list.reverse()
  }

  static makeMix(playlist) {
    const allTracks = Track.getList()
    let randomTracks = allTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
    playlist.tracks.push(...randomTracks)
  }

  static getById(id) {
    return this.#list.find((v) => v.id === id) || null
  }

  deleteTrackById(trackID) {
    this.tracks = this.tracks.filter((v) => {
      return v.id !== trackID
    })
  }
  static findListByValue(value) {
    return this.#list.filter((v) => {
      const newValueName = v.name.toLowerCase()
      const oldValueName = value.toLowerCase()
      return newValueName.includes(oldValueName)
    })
  }
}

Playlist.create('name')
Playlist.create('name')
Playlist.create('name')
Playlist.create('name')
Playlist.create('name')

module.exports = Playlist
