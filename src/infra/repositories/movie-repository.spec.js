const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const MovieRepository = require('./movie-repository')

let db

const makeSut = () => {
  const movieModel = db.collection('movies')
  const sut = new MovieRepository(movieModel)

  return { movieModel, sut }
}

describe('MovieRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('movies').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.close()
  })

  test('Should return null if title isnt provided', async () => {
    const { sut } = makeSut()
    const movie = await sut.getMovie('any_title')
    expect(movie).toBeNull()
  })

  test('Should return a movie if title is founded', async () => {
    const { movieModel, sut } = makeSut()
    await movieModel.insertOne({ title: 'any_title' })
    const movie = await sut.getMovie('any_title')
    expect(movie.title).toBe('any_title')
  })

  test('Shoud throw if no movieModel is provided', async () => {
    const sut = new MovieRepository()
    const promisse = sut.getMovie('any_movie')
    await expect(promisse).rejects.toThrow()
  })

  test('Shoud throw if no title is provided', async () => {
    const { sut } = makeSut()
    const promisse = sut.getMovie()
    await expect(promisse).rejects.toThrow(new MissingParamError('title'))
  })
})
