const movieRouter = require('../composers/movie-routes-composer')
const ExpressRouterAdapter = require('../adapter/express-route-adapter')

module.exports = router => {
  router.get('/movies/', ExpressRouterAdapter.adapt(movieRouter))
}
