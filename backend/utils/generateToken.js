
const jwt = require('jsonwebtoken');

const generateToken = (id, isAdmin) => {
   console.log("DEBUG: JWT_SECRET exists?", !!process.env.JWT_SECRET);

  if (!process.env.JWT_SECRET) {
    throw new Error("CRITICAL: JWT_SECRET is missing from .env file!");
  }
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = { generateToken };
