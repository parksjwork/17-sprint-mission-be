import { create } from "superstruct";
import * as productCommentService from "../service/productCommentService.js";
import ProductIdStruct from "../structs/product/ProductIdStruct.js";
import GetProductCommentsStruct from "../structs/productComment/GetProductCommentsStruct.js";
import CreateProductCommentStruct from "../structs/productComment/CreateProductCommentStruct.js";
import UpdateProductCommentStruct from "../structs/productComment/UpdateProductCommentStruct.js";
import ProductCommentIdStruct from "../structs/productComment/ProductCommentStruct.js";

// 상품 댓글 등록
const createProductComment = async (req, res) => {
  const { id } = create(req.params, ProductIdStruct);
  const { content } = create(req.body, CreateProductCommentStruct);

  const comment = await productCommentService.createProductComment({
    productId: id,
    content,
  });

  res.status(201).json(comment);
};

// 상품 댓글 목록 조회
const getProductComments = async (req, res) => {
  const { id: productId } = create(req.params, ProductIdStruct);
  const query = create(req.query, GetProductCommentsStruct);

  const result = await productCommentService.getProductComments(
    productId,
    query,
  );

  res.status(200).json(result);
};

// 상품 댓글 수정
const updateProductComment = async (req, res) => {
  const { id } = create(req.params, ProductCommentIdStruct);
  const { content } = create(req.body, UpdateProductCommentStruct);

  const comment = await productCommentService.updateProductComment(id, {
    content,
  });

  res.status(200).json(comment);
};

// 상품 댓글 삭제
const deleteProductComment = async (req, res) => {
  const { id } = create(req.params, ProductCommentIdStruct);

  await productCommentService.deleteProductComment(id);

  res.status(204).end();
};

export {
  createProductComment,
  getProductComments,
  updateProductComment,
  deleteProductComment,
};
