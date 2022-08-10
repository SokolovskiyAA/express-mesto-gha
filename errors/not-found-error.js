const status = require('../../../../Рабочий стол/express-mesto-gha-mainFAR/express-mesto-gha-mainFAR/utils/status');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.NOTFOUND;
  }
}

module.exports = NotFoundError;
