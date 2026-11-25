import { StructError } from "superstruct";
import { Prisma } from "../generated/prisma/client.ts";
import HttpException from "../exceptions/HttpException.js";
import BadRequestException from "../exceptions/BadRequestException.js";
import InternalServerErrorException from "../exceptions/InternalServerErrorException.js";

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
// Prisma 고유 제약조건(UNIQUE) 위반으로 인한 중복 데이터 오류
  err instanceof Prisma.PrismaClientKnownRequestError &&
  err.code === "P2002"
) {
  exception = new BadRequestException("이미 존재하는 데이터입니다.");
} else if (err.type === "entity.parse.failed") {
  // JSON 파싱 실패
  exception = new BadRequestException("잘못된 JSON 형식입니다.");
} else if (!(err instanceof HttpException)) {
  // 그 외 예상하지 못한 오류
  exception = new InternalServerErrorException(
    "서버 내부 오류가 발생했습니다.",
  );
}

  res.status(exception.status).json({
    name: exception.name,
    message: exception.message,
  });
};

export default errorHandler;
