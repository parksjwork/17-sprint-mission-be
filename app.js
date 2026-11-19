require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnect");
const NotFoundProduct = require("./exceptions/NotFoundProduct.js");
const errorHandler = require("./middlewares/errerHandler.js");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("백엔드 서버 연결 성공!");
});

// post 요청으로 클라이언트가 보낸 JSON 데이터를 자바스크립트 객체 등으로 변환하여 req.body로 사용하기 위함
// 컨트롤러에서 req.body를 사용하기 전에 미리 데이터를 변환해야 하기 때문에 반드시 라우터를 연결하는 코드 위에 있어야함
app.use(express.json());

async function startServer() {
  // DB를 연결 한 이후에 요청을 받기 시작하기 위해 await 사용
  await dbConnect();

  app.use("/items", require("./routes/productRoutes"));

  // 등록되지 않은 경로로 요청이 들어올 경우
  app.use((req, res) => {
    throw new NotFoundProduct("요청한 경로가 없습니다.");
  });

  // 그 외 에러 처리: 반드시 라우터 뒤에 등록
  app.use(errorHandler);

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`서버 실행 중: http://localhost:${port}`);
  });
}

startServer();
