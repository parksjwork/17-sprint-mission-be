const HttpException = require("./HttpException");

class InternalServerErrorException extends HttpException {
  constructor(message) {
    super({
      status: 500,
      name: "Internal Server Error",
      message,
    });
  }
}

module.exports = InternalServerErrorException;
