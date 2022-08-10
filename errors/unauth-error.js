const status = require('../../../../Рабочий стол/express-mesto-gha-mainFAR/express-mesto-gha-mainFAR/utils/status');

class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.UNAUTHORIZED;
  }
}

module.exports = UnAuthorizedError;
