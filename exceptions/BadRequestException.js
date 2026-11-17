// 사용자 정의 예외

const HttpException = require("./HttpException");

class BadRequestException extends HttpException {
  constructor(message) {
    super({
      status: 400,
      name: "Bad Request",
      message,
    });
  }
}

module.exports = BadRequestException;
