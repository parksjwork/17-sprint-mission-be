import prisma from "../config/prisma.js";
import NotFoundException from "../exceptions/NotFoundException.js";

const createArticle = async ({ title, content }) => {
  const article = await prisma.article.create({
    data: {
      title,
      content,
    },
  });
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
};

const getArticles = async ({ page, pageSize, orderBy, keyword }) => {
  // 검색 쿼리
  const where = {};

  if (keyword) {
    where.OR = [
      { title: { contains: keyword, mode: "insensitive" } },
      { content: { contains: keyword, mode: "insensitive" } },
    ];
  }

  let order;
  // 정렬: 생성일자 최신순
  if (orderBy == "recent") {
    order = [{ createdAt: "desc" }];
  }

  const articles = await prisma.article.findMany({
    where,
    omit: { updatedAt: true }, //필요없는 데이터 제외하고 불러오기
    orderBy: order,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.article.count({ where });

  return {
    pagination: {
      pageSize,
      currentPage: page,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
    article: articles,
  };
};

const getArticle = async ({ id }) => {
  const article = await prisma.article.findUnique({
    where: { id },
    omit: { updatedAt: true },
  });

  if (!article) {
    throw new NotFoundException("게시글을 찾을 수 없습니다.");
  }

  return article;
};

const updateArticle = async ({ id, title, content }) => {
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) {
    throw new NotFoundException("게시글을 찾을 수 없습니다.");
  }

  const data = {};
  if (title) data.title = title;
  if (content) data.content = content;
  data.updatedAt = new Date();

  const newArticle = await prisma.article.update({
    where: { id },
    data,
  });

  return newArticle;
};

const deleteArticle = async ({ id }) => {
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) {
    throw new NotFoundException("게시글을 찾을 수 없습니다.");
  }

  await prisma.article.delete({ where: { id } });
};

export { createArticle, getArticles, getArticle, updateArticle, deleteArticle };
