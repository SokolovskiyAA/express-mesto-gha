const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/unauth-error');

const handleAuthError = (next) => next(new UnAuthorizedError('Необходимо авторизоваться'));

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'ultra-strong-secret');
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;

  return next();
};
