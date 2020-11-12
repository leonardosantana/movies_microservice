const { MissingParamError } = require('../../utils/errors')

class MovieUseCase {
  async getMovie (title, language) {
    if (!title) {
      throw new MissingParamError('title')
    }
    if (!language) {
      throw new MissingParamError('language')
    }
  }
}

describe('Movie UseCase Tests', () => {
  test('Should throw if no title provided', async () => {
    const sut = new MovieUseCase()
    const promise = sut.getMovie(null, null)
    await expect(promise).rejects.toThrow(new MissingParamError('title'))
  })

  test('Should throw if no language provided', async () => {
    const sut = new MovieUseCase()
    const promise = sut.getMovie('any_title', null)
    await expect(promise).rejects.toThrow()
  })
})
