import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma Client 생성
// - generated/prisma : npx prisma generate로 생성된 Client
// - adapter : Prisma 7부터 DB 드라이버(pg)를 어댑터로 연결
// - omit : 모든 조회에서 password 제외 (로그인 시에만 다시 포함)
// - log : 개발 환경에서 실행되는 SQL을 콘솔에 출력
// - timezone=UTC : DB 세션 시간대가 UTC가 아니면(ex. Asia/Seoul) 시간이 9시간 어긋나므로 UTC로 고정

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  options: "-c timezone=UTC",
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
