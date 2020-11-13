const cors = require('../midleware/cors')
const jsonParser = require('../midleware/json-parser')
const contentType = require('../midleware/content-type')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser)
  app.use(contentType)
}
