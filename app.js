require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnect");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("백엔드 서버 연결 성공!");
});

// DB를 연결 한 이후에 요청을 받기 시작함
async function startServer() {
  await dbConnect();

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`서버 실행 중: http://localhost:${port}`);
  });
}

startServer();
