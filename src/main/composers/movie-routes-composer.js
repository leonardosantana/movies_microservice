const MovieUseCase = require('../../domain/usecases/movie-usecase')
const MovieRepository = require('../../infra/repositories/movie-repository')
const MongoHelper = require('../../infra/helpers/mongo-helper')

const movieModel = MongoHelper.getDb().collection('movies')
const movieRepository = new MovieRepository(movieModel)
const movieUseCase = new MovieUseCase(movieRepository)

module.exports = movieUseCase
