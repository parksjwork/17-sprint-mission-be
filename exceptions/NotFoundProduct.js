const HttpException = require("./HttpException");

class NotFoundProduct extends HttpException {
  constructor(message) {
    super({
      status: 404,
      name: "Not Found",
      message,
    });
  }
}

module.exports = NotFoundProduct;
