const MovieRouter = require('./movie-router')
const MissingParamError = require('../helpers/missing-param-error')
const ServerError = require('../helpers/server-error')

const makeSut = () => {
  class MovieUseCaseSpy {
    async getMovie (title, language) {
      this.movie = {}

      if (title === 'throw_error') {
        throw new Error()
      }
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
  test('Should return 400 if no movie title is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        language: 'any_language'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('title'))
  })

  test('Should return 400 if no movie language is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_movie'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('language'))
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no body in httpRequest ', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no MovieUseCase is provided ', async () => {
    const sut = new MovieRouter()
    const httpRequest = {
      body: {
        title: 'any_movie',
        language: 'any_language'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no MovieUseCase no has getMovie method ', async () => {
    const sut = new MovieRouter({})
    const httpRequest = {
      body: {
        title: 'any_movie',
        language: 'any_language'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call getMovieUseCase with correct Params', async () => {
    const { sut, movieUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_movie',
        language: 'any_language'
      }
    }
    await sut.route(httpRequest)
    expect(movieUseCaseSpy.movie.title).toBe(httpRequest.body.title)
    expect(movieUseCaseSpy.movie.language).toBe(httpRequest.body.language)
  })

  test('Should get Movie from MovieRoute', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_movie',
        language: 'any_language'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpRequest.body.title).toBe(httpResponse.body.movie.title)
    expect(httpRequest.body.language).toBe(httpResponse.body.movie.language)
  })

  test('Should get not found Movie from MovieRoute', async () => {
    const { sut, movieUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        title: 'not_found_movie',
        language: 'any_language'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(movieUseCaseSpy.movie).toEqual(httpResponse.body.movie)
  })

  test('Should getMovie throw Error', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'throw_error',
        language: 'any_language'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
