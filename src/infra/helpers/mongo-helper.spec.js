const { TestScheduler } = require('jest')
const { isExportDeclaration } = require('typescript')
const mongoHelper = require('./mongo-helper')

const MongoHelper = require('./mongo-helper')

describe('test mongo helper', () => {
  test('should reconnect when connection closed', async () => {
    const sut = MongoHelper
    await sut.connect(process.env.MONGO_URL)
    expect(sut.db).toBeTruthy()
    await sut.close()
    expect(sut.db).toBeFalsy()
    await sut.getDb()
    expect(sut.db).toBeTruthy()
  })
})
