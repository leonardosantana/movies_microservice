class MovieRouter {
  route (httpRequest) {
    if (!httpRequest.body.title || !httpRequest.body.language) {
      return {
        statusCode: 400
      }
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
})
