import prisma from "./config/prisma.js";

try {
  await prisma.$connect();
  console.log("PostgreSQL 연결 성공!");
} catch (err) {
  console.error("PostgreSQL 연결 실패:", err.message);
} finally {
  await prisma.$disconnect();
}
