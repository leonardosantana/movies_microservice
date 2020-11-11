class MovieRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500
      }
    }

    const { title, language } = httpRequest.body
    if (!title || !language) {
      
    }
  }
}

class HttpResponse(){
  static badRequest(){
    return {
      statusCode: 400
    }
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
