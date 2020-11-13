const request = require('supertest')
const app = require('../config/app')

describe('App setup', () => {
  test('Should enable CORS', () => {
    app.post('/test-json-parser', (req, res) => {
      res.send(req.body)
    })

    request(app)
      .post('/test-json-parser')
      .send({ name: 'Leo' })
      .expect({ name: 'Leo' })
  })
})
