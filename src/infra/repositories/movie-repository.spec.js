class MovieRepository {
  getMovie (title) {
    return null
  }
}

describe('MovieRepository', () => {
  test('Should return null if title isnt provided', async () => {
    const sut = new MovieRepository()
    const movie = await sut.getMovie('any_title')
    expect(movie).toBeNull()
  })

  test('Should return null if title isnt provided', async () => {
    const sut = new MovieRepository()
    const movie = await sut.getMovie('any_title')
    expect(movie).toBeNull()
  })
})
