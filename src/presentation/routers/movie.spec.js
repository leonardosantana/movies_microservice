const MovieRouter = require('./movie-router')
const MissingParamError = require('../helpers/missing-param-error')

describe('Movie Router', () => {
  test('Should return 400 if no movie title is provided', () => {
    const sut = new MovieRouter()
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
    const sut = new MovieRouter()
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
    const sut = new MovieRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no body in httpRequest ', () => {
    const sut = new MovieRouter()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
