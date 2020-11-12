module.exports = class ServerError extends Error {
  constructor (param) {
    super('Server Error')
    this.name = 'ServerError'
  }
}
