const express = require('express')
const router = express.Router()
const Playlist = require('../models/Playlist')
const Track = require('../models/Track')

router.get('/spotify', function (req, res) {
  const playlists = Playlist.getList().map((v) => {
    v.length = v.tracks.length
    return v
  })

  res.render('spotify/index', {
    style: 'spotify/',
    data: { playlists },
  })
})
router.get('/spotify-choose', function (req, res) {
  res.render('spotify/spotify-choose', {
    style: 'spotify/spotify-choose',
  })
})
router.get('/spotify-search', function (req, res) {
  res.render('spotify/spotify-search', {
    style: 'spotify/spotify-search',
    data: {
      list: Playlist.getList().map((v) => {
        v.amount = v.tracks.length
        return v
      }),
    },
  })
})

router.post('/spotify-search', function (req, res) {
  console.log(req.body)
  const value = req.body.value
  console.log(value)
  const playlist = Playlist.findListByValue(value).map(
    (v) => {
      v.amount = v.tracks.length
      return v
    },
  )

  res.render('spotify/spotify-search', {
    style: 'spotify/spotify-search',
    data: {
      list: playlist,
    },
  })
})

router.post('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix
  const name = req.body.name

  const playlist = Playlist.create(name)

  if (isMix) {
    Playlist.makeMix(playlist)
  }
  if (!name) {
    return res.render('alert', { style: 'alert' })
  }
  res.render('spotify/spotify-playlist', {
    style: 'spotify/spotify-playlist',
    data: { playlist },
  })
})

router.get('/spotify-playlist', function (req, res) {
  const id = Number(req.query.id)
  const playlist = Playlist.getById(id)
  res.render('spotify/spotify-playlist', {
    style: 'spotify/spotify-playlist',
    data: { playlist },
  })
})

router.get('/spotify-delete-track', function (req, res) {
  const { playlist_id, track_id } = req.query

  const playlist = Playlist.getById(Number(playlist_id))

  playlist.deleteTrackById(Number(track_id))

  res.render('spotify/spotify-playlist', {
    style: 'spotify/spotify-playlist',
    data: { playlist },
  })
})

router.get(
  '/spotify-playlist-add-track',
  function (req, res) {
    const playlist_id = Number(req.query.playlist_id)
    const track_id = Number(req.query.track_id)
    if (track_id) {
      const playlist = Playlist.getById(playlist_id)
      const track = Track.getById(track_id)
      playlist.tracks.unshift(track)
      return res.render('spotify/spotify-playlist', {
        style: 'spotify/spotify-playlist',
        data: { playlist },
      })
    }

    const tracks = Track.getList()

    res.render('spotify/spotify-playlist-add-track', {
      style: 'spotify/spotify-playlist-add-track',
      data: { playlist_id, tracks },
    })
  },
)
router.post(
  '/spotify-playlist-add-track',
  function (req, res) {
    const tracks = Track.getList()

    res.render('spotify/spotify-playlist-add-track', {
      style: 'spotify/spotify-playlist-add-track',
      data: { playlist_id, tracks },
    })
  },
)

module.exports = router
