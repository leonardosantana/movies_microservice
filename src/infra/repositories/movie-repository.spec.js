const { MongoClient } = require('mongodb')
const MovieRepository = require('./movie-repository')

let client, db

const makeSut = () => {
  const movieModel = db.collection('movies')
  const sut = new MovieRepository(movieModel)

  return { movieModel, sut }
}

describe('MovieRepository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = client.db()
  })

  beforeEach(async () => {
    await db.collection('movies').deleteMany()
  })

  afterAll(async () => {
    await client.close()
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
})
