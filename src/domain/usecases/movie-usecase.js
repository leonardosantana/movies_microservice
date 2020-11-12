const { MissingParamError } = require('../../utils/errors')

module.exports = class MovieUseCase {
  constructor (movieRepository) {
    this.movieRepository = movieRepository
  }

  async getMovie (title, language) {
    if (!title) {
      throw new MissingParamError('title')
    }
    if (!language) {
      throw new MissingParamError('language')
    }

    if (!this.movieRepository) {
      throw new MissingParamError('movieRepository')
    }

    if (!this.movieRepository.getMovie) {
      throw new MissingParamError('movieRepository.getMovie')
    }

    return this.movieRepository.getMovie(title)
  }
}
