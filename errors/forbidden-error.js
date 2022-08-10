const status = require('../../../../Рабочий стол/express-mesto-gha-mainFAR/express-mesto-gha-mainFAR/utils/status');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
