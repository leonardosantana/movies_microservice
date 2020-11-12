const { MissingParamError } = require('../../utils/errors')

class MovieUseCase {
  constructor (movieRepository) {
    this.movieRepository = movieRepository
  }

  async getMovie (title, language) {
    if (!title) {
      throw new MissingParamError('title')
    }
    if (!language) {
      throw new MissingParamError('language')
    }

    return this.movieRepository.getMovie(title)
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

  test('Should getMovie form repository', async () => {
    class LoadMovieByTitleRepositorySpy {
      async getMovie (title) {
        this.movie = {}
        this.movie.title = title

        return this.movie
      }
    }

    const loadMovieByTitleRepositorySpy = new LoadMovieByTitleRepositorySpy()
    const sut = new MovieUseCase(loadMovieByTitleRepositorySpy)
    await sut.getMovie('any_title', 'any_language')
    expect(loadMovieByTitleRepositorySpy.movie.title).toBe('any_title')
  })
})
