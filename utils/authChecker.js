const httpError = require('../models/httpError');

exports.authHeader = (req, message, statusCode) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new httpError(message, statusCode);
  }
  return header.split(' ')[1];
};
