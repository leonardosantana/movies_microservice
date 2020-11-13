
module.exports = class MovieRepository {
  constructor (movieModel) {
    this.movieModel = movieModel
  }

  async getMovie (title) {
    const movie = await this.movieModel.findOne({ title })
    return movie
  }
}
