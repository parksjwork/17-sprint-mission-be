import prisma from "../config/prisma.js";

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

export { createArticle };
