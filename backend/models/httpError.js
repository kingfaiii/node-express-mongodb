class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.status = errorCode;
    this.statusCode = errorCode;
  }
}

module.exports = HttpError;
