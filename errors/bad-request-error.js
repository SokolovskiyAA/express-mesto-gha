const status = require('../../../../Рабочий стол/express-mesto-gha-mainFAR/express-mesto-gha-mainFAR/utils/status');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.ERROR;
  }
}

module.exports = BadRequestError;
