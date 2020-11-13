const movieRouter = require('../composers/movie-routes-composer')

module.exports = router => {
  router.get('/movies/', movieRouter)
}
