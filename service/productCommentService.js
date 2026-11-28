import prisma from "../config/prisma.js";
import NotFoundException from "../exceptions/NotFoundException.js";

// 상품 댓글 등록
const createProductComment = async ({ productId, content }) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new NotFoundException("상품을 찾을 수 없습니다.");
  }

  const comment = await prisma.productComment.create({
    data: {
      productId,
      content,
    },
  });

  return comment;
};

// 상품 댓글 목록 조회 (커서 기반 페이지네이션, 작성순)
const getProductComments = async (productId, { cursor, limit }) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new NotFoundException("상품을 찾을 수 없습니다.");
  }

  // cursor: 마지막으로 받은 댓글 id (첫 페이지는 없음)
  // limit + 1개를 조회해서 다음 페이지 존재 여부 판단
  const comments = await prisma.productComment.findMany({
    where: { productId },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    omit: { productId: true, updatedAt: true },
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

// 상품 댓글 수정
const updateProductComment = async (id, { content }) => {
  const comment = await prisma.productComment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new NotFoundException("댓글을 찾을 수 없습니다.");
  }

  const newComment = await prisma.productComment.update({
    where: { id },
    data: { content, updatedAt: new Date() },
  });

  return newComment;
};

// 상품 댓글 삭제
const deleteProductComment = async (id) => {
  const comment = await prisma.productComment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new NotFoundException("댓글을 찾을 수 없습니다.");
  }

  await prisma.productComment.delete({ where: { id } });
};

export {
  createProductComment,
  getProductComments,
  updateProductComment,
  deleteProductComment,
};
