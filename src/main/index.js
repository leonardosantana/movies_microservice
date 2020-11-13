const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')
const app = require('./config/app')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    app.listen(8080, () => {
      console.log('Server Running')
    })
  })
  .catch(console.error)
