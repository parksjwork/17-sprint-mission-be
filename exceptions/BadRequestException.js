import HttpException from "./HttpException.js";

class BadRequestException extends HttpException {
  constructor(message) {
    super({
      status: 400,
      name: "Bad Request",
      message,
    });
  }
}

export default BadRequestException;
