import HttpException from "./HttpException.js";

class NotFoundProduct extends HttpException {
  constructor(message) {
    super({
      status: 404,
      name: "Not Found",
      message,
    });
  }
}

export default NotFoundProduct;
