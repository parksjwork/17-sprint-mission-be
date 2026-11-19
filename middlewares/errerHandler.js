const mongoose = require("mongoose");
const { StructError } = require("superstruct");
const HttpException = require("../exceptions/HttpException");
const BadRequestException = require("../exceptions/BadRequestException");
const InternalServerErrorException = require("../exceptions/InternalServerErrorException");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  // 전달 받은 에러 종류에 따라 다른 여러 에러 객체로 변경하기에 ㅣet 사용
  let exception = err;

  // 가격은 숫자열인데 문자열이 들어오는 등 유효성 검증
  // 유효성 검증 에러라면 400 에러 객체로 변경
  // superstruct에서 발생한 오류인지
  if (err instanceof StructError) {
    exception = new BadRequestException(err.message);
  } else if (
    // mongoose 타입 변환 및 스키마 검증 실패
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError
  ) {
    exception = new BadRequestException(err.message);
  }
  // 11000은 MongoDB에서 중복 데이터 에러 발생했을 때 사용
  // unique: true 일 때 중복인지 검증
  else if (err.code === 11000) {
    exception = new BadRequestException(
      `이미 사용중인 ${Object.keys(err.keyValue)[0]}입니다.`,
    );
  } else if (err.type === "entity.parse.failed") {
    // JSON 파싱 실패(필드뒤에 ,가 없는 경우 등)
    exception = new BadRequestException("잘못된 JSON 형식입니다.");
  }
  // 그 외 에러는 500번대로 처리
  else if (!(err instanceof HttpException)) {
    exception = new InternalServerErrorException(
      "서버 내부 오류가 발생했습니다.",
    );
  }

  res.status(exception.status).json({
    name: exception.name,
    message: exception.message,
  });
};

module.exports = errorHandler;
