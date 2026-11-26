import HttpException from "./HttpException.js";

class NotFoundExceptioon extends HttpException {
  constructor(message) {
    super({
      status: 404,
      name: "Not Found",
      message,
    });
  }
}

export default NotFoundExceptioon;
