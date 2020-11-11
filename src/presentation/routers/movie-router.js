
const HttpResponse = require('../helpers/http-response')

module.exports = class MovieRouter {
  constructor (movieUseCase) {
    this.movieUseCase = movieUseCase
  }

  async route (httpRequest) {
    try {
      const { title, language } = httpRequest.body
      if (!title) {
        return HttpResponse.badRequest('title')
      }
      if (!language) {
        return HttpResponse.badRequest('language')
      }

      const movie = await this.movieUseCase.getMovie(title, language)

      if (!movie) {
        return HttpResponse.response({})
      }

      return HttpResponse.response({ movie: movie })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
