import HttpException from "./HttpException.js";

class InternalServerErrorException extends HttpException {
  constructor(message) {
    super({
      status: 500,
      name: "Internal Server Error",
      message,
    });
  }
}

export default InternalServerErrorException;
