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

    if (!this.movieRepository) {
      throw new MissingParamError('movieRepository')
    }

    if (!this.movieRepository.getMovie) {
      throw new MissingParamError('movieRepository.getMovie')
    }

    return this.movieRepository.getMovie(title)
  }
}

const makeSut = () => {
  class LoadMovieByTitleRepositorySpy {
    async getMovie (title) {
      this.movie = {}
      if (title !== 'not_found_movie') {
        this.movie.title = title
      }

      return this.movie
    }
  }

  const loadMovieByTitleRepositorySpy = new LoadMovieByTitleRepositorySpy()
  const sut = new MovieUseCase(loadMovieByTitleRepositorySpy)
  return { sut, loadMovieByTitleRepositorySpy }
}

describe('Movie UseCase Tests', () => {
  test('Should throw if no title provided', async () => {
    const { sut } = makeSut()
    const promise = sut.getMovie(null, null)
    await expect(promise).rejects.toThrow(new MissingParamError('title'))
  })

  test('Should throw if no language provided', async () => {
    const { sut } = makeSut()
    const promise = sut.getMovie('any_title', null)
    await expect(promise).rejects.toThrow(new MissingParamError('language'))
  })

  test('Should getMovie form repository', async () => {
    const { sut, loadMovieByTitleRepositorySpy } = makeSut()
    await sut.getMovie('any_title', 'any_language')
    expect(loadMovieByTitleRepositorySpy.movie.title).toBe('any_title')
  })

  test('Should throw with no repository provided', async () => {
    const sut = new MovieUseCase()
    const promise = sut.getMovie('any_title', 'any_language')
    await expect(promise).rejects.toThrow(new MissingParamError('movieRepository'))
  })

  test('Should throw with no getMovie in repository provided', async () => {
    const sut = new MovieUseCase({})
    const promise = sut.getMovie('any_title', 'any_language')
    await expect(promise).rejects.toThrow(new MissingParamError('movieRepository.getMovie'))
  })

  test('Should getMovie form repository', async () => {
    const { sut, loadMovieByTitleRepositorySpy } = makeSut()
    await sut.getMovie('not_found_movie', 'any_language')
    expect(loadMovieByTitleRepositorySpy.movie).toEqual({})
  })
})
