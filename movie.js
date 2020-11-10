const express = require('express')
const router = express.Router()

module.exports = () => {
  router.get('/movies', new MovieRoutes().getMovies)
}

class MovieRoutes {
  async getMovies (req, res) {
    res.status(200).json({ teste: 'ok' })
  }
}
