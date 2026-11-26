import prisma from "../config/prisma.js";
import NotFoundException from "../exceptions/NotFoundException.js";

const createArticleComment = async ({ articleId, content }) => {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    throw new NotFoundException("게시글을 찾을 수 없습니다.");
  }

  const comment = await prisma.articleComment.create({
    data: {
      articleId,
      content,
    },
  });
  return comment;
};

// 게시글의 댓글 목록 (커서 기반 페이지네이션, 작성순)

const getArticleComments = async (articleId, { cursor, limit }) => {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    throw new NotFoundException("게시글을 찾을 수 없습니다.");
  }

  // - cursor : 마지막으로 받은 댓글 id (첫 페이지는 없음)
  // - limit + 1개를 조회해서 다음 페이지 존재 여부 판단
  // - offset(skip) 방식과 달리 앞 페이지를 건너뛰지 않아서 데이터가 많아도 속도가 일정함
  const comments = await prisma.articleComment.findMany({
    where: { articleId },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });

  // 다음 페이지가 있는지 판단
  const hasNext = comments.length > limit;

  // 판단용으로 가져온 1개는 응답에서 제외
  const result = hasNext ? comments.slice(0, limit) : comments;

  return {
    pagination: {
      limit,
      hasNext,
      nextCursor: hasNext ? result[result.length - 1].id : null,
    },
    comments: result,
  };
};

const updateArticleComment = async (id, { content }) => {
  const comment = await prisma.articleComment.findUnique({ where: { id } });
  if (!comment) {
    throw new NotFoundException("댓글을 찾을 수 없습니다.");
  }

  const newComment = await prisma.articleComment.update({
    where: { id },
    data: { content, updatedAt: new Date() },
  });

  return newComment;
};

export { createArticleComment, getArticleComments, updateArticleComment };
