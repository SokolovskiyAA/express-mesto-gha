const status = require('../../../../Рабочий стол/express-mesto-gha-mainFAR/express-mesto-gha-mainFAR/utils/status');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.CONFLICT;
  }
}

module.exports = ConflictError;
