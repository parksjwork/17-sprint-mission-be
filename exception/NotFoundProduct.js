const HttpException = require("./HttpException");

class NotFoundException extends HttpException {
  constructor(message) {
    super({
      status: 404,
      name: "Not Found",
      message,
    });
  }
}

module.exports = NotFoundException;