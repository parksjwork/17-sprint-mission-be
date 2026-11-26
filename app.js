import "dotenv/config";
import express from "express";
import NotFoundException from "./exceptions/NotFoundException.js";
import errorHandler from "./middlewares/errerHandler.js";
import cors from "cors";
import prisma from "./config/prisma.js";
import articleRouter from "./routes/articleRoutes.js";
import articleCommentRouter from "./routes/articleCommentRoutes.js";

const app = express();
const port = 4000;

// 개발 환경에서는 모든 출처를 허용하는 것이 편하다고 강사님께 이야기 들었고,
// 배포 전 화이트리스트를 적용하여 허용할 출처를 제한할 것을 멘토님께 리뷰 받았음
// 추후에 이 부분 다시 확인하여 배포 전에는 화이트리스트 작성할 것
app.use(cors());

app.get("/", (req, res) => {
  res.send("백엔드 서버 연결 성공!");
});

// post 요청으로 클라이언트가 보낸 JSON 데이터를 자바스크립트 객체 등으로 변환하여 req.body로 사용하기 위함
// 컨트롤러에서 req.body를 사용하기 전에 미리 데이터를 변환해야 하기 때문에 반드시 라우터를 연결하는 코드 위에 있어야함
app.use(express.json());

async function startServer() {
  // DB를 연결 한 이후에 요청을 받기 시작하기 위해 await 사용
  await prisma.$connect();

  // app.use("/items", require("./routes/productRoutes"));
  app.use("/articles", articleRouter);
  app.use("/article_comments", articleCommentRouter);

  // 등록되지 않은 경로로 요청이 들어올 경우
  app.use((req, res) => {
    throw new NotFoundException("요청한 경로가 없습니다.");
  });

  // 그 외 에러 처리: 반드시 라우터 뒤에 등록
  app.use(errorHandler);

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`서버 실행 중: http://localhost:${port}`);
  });
}

startServer();
