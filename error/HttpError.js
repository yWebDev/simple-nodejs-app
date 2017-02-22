class HttpError extends Error {
  constructor(code, message, ...args) {
    super(...args);
    this.code = code;
    this.message = message;
  }
}

module.exports = HttpError;