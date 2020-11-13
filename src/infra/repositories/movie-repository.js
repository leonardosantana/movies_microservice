const { MissingParamError } = require('../../utils/errors')

module.exports = class MovieRepository {
  constructor (movieModel) {
    this.movieModel = movieModel
  }

  async getMovie (title) {
    if (!title) {
      throw new MissingParamError('title')
    }
    const movie = await this.movieModel.findOne({ title })
    return movie
  }
}
