
const HttpResponse = require('../helpers/http-response')

module.exports = class MovieRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }

    const { title, language } = httpRequest.body
    if (!title) {
      return HttpResponse.badRequest('title')
    }
    if (!language) {
      return HttpResponse.badRequest('language')
    }
  }
}
