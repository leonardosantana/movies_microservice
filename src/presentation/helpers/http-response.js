const { MissingParamError } = require('../../utils/errors')
const { ServerError } = require('../errors')

module.exports = class HttpResponse {
  static badRequest (param) {
    return {
      statusCode: 400,
      body: new MissingParamError(param)
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static response (obj) {
    return {
      statusCode: 200,
      body: obj
    }
  }
}
