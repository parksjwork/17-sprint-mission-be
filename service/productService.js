import prisma from "../config/prisma.js";

const getProducts = async ({ page, pageSize, orderBy, keyword }) => {
  // - 검색(keyword) -> 정렬(orderBy) -> 페이지(page) 순서로 처리
  const filters = {};

  if (keyword) {
    // 특수문자를 이스케이프로 처리는 추후에
    filters.OR = [
      { name: { contains: keyword, mode: "insensitive" } },
      { description: { contains: keyword, mode: "insensitive" } },
    ];
  }

  // 페이지네이션
  const products = await prisma.product.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  // 글의 전체 갯수
  const totalCount = await prisma.product.count({
    where: filters,
  });

  return {
    totalCount,
    list: products,
  };
};

export { getProducts };
