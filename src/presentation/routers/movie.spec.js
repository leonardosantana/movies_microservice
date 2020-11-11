const MovieRouter = require('./movie-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  class MovieUseCaseSpy {
    getMovie (title, language) {
      this.movie = {}

      if (title !== 'not_found_movie') {
        this.movie.title = title
        this.movie.language = language
      }

      return this.movie
    }
  }

  const movieUseCaseSpy = new MovieUseCaseSpy()
  const sut = new MovieRouter(movieUseCaseSpy)

  return {
    sut,
    movieUseCaseSpy
  }
}

describe('Movie Router', () => {
  test('Should return 400 if no movie title is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        language: 'any_language'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('title'))
  })

  test('Should return 400 if no movie language is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_movie'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('language'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no body in httpRequest ', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no MovieUseCase is provided ', () => {
    const sut = new MovieRouter()
    const httpRequest = {
      body: {
        title: 'any_movie',
        language: 'any_language'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no MovieUseCase no has getMovie method ', () => {
    const sut = new MovieRouter({})
    const httpRequest = {
      body: {
        title: 'any_movie',
        language: 'any_language'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call getMovieUseCase with correct Params', () => {
    const { sut, movieUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_movie',
        language: 'any_language'
      }
    }
    sut.route(httpRequest)
    expect(movieUseCaseSpy.movie.title).toBe(httpRequest.body.title)
    expect(movieUseCaseSpy.movie.language).toBe(httpRequest.body.language)
  })

  test('Should get Movie from MovieRoute', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_movie',
        language: 'any_language'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpRequest.body.title).toBe(httpResponse.body.title)
    expect(httpRequest.body.language).toBe(httpResponse.body.language)
  })

  test('Should get not found Movie from MovieRoute', () => {
    const { sut, movieUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        title: 'not_found_movie',
        language: 'any_language'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(movieUseCaseSpy.movie).toEqual(httpResponse.body)
  })
})
