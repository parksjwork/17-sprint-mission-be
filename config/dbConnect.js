const mongoose = require("mongoose");

// MongoDB 연결
// - 접속 주소는 .env의 DATABASE_URL (도커 실행 시 docker-compose.yml의 값으로 덮어씀)
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB connected");
  } catch (err) {
    console.error(err);
    process.exit(1); // 연결 실패 시 서버를 종료해야 배포 로그에서 바로 원인 확인 가능
  }
};

module.exports = dbConnect;
