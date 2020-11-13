const request = require('supertest')
const app = require('../config/app')

describe('App setup', () => {
  test('disable x-powered-by markup in header ', () => {
    app.get('/test_call', (req, res) => {
      res.send('')
    })
    request(app)
      .get('/test_call')
      .then(res => {
        expect(res.headers['x-powered-by']).toBeUndefined()
      })
  })
})
