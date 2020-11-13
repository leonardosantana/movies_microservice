module.exports = class ExpressRouteAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const htttpResponse = await router.route(httpRequest)
      res.status(htttpResponse.statusCode).json(htttpResponse.body)
    }
  }
}
