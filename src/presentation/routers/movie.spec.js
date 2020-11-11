class MovieRouter {
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

class HttpResponse {
  static badRequest (param) {
    return {
      statusCode: 400,
      body: new MissingParamError(param)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}

class MissingParamError extends Error {
  constructor (param) {
    super(`Missing param: ${param}`)
    this.name = 'MissingParamError'
  }
}

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
