const httpError = require('../models/httpError');
const jwt = require('jsonwebtoken');
const { authHeader } = require('../utils/authChecker');
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('FATAL ERROR: JWT_SECRET is not defined in .env');
}

exports.isUserLogged = (req, res, next) => {
  const token = authHeader(req, 'Not Authorized', 401);
  try {
    const decode = jwt.verify(token, jwtSecret);
    req.user = decode;
    next();
  } catch (error) {
    throw new httpError('Not Authorized!', 401);
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    return next();
  }
  next(new httpError('Access Denied: Admins Only!', 403));
};
