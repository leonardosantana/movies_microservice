
const HttpResponse = require('../helpers/http-response')

module.exports = class MovieRouter {
  constructor (movieUseCase) {
    this.movieUseCase = movieUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.movieUseCase || !this.movieUseCase.getMovie) {
      return HttpResponse.serverError()
    }

    const { title, language } = httpRequest.body
    if (!title) {
      return HttpResponse.badRequest('title')
    }
    if (!language) {
      return HttpResponse.badRequest('language')
    }

    const movie = this.movieUseCase.getMovie(title, language)

    if (!movie) {
      return HttpResponse.response({})
    }

    return HttpResponse.response(movie)
  }
}
