import express from "express";

import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import {
  createProductComment,
  getProductComments,
} from "../controllers/productCommentController.js";

const router = express.Router();

// 상품
router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

// 상품 댓글
router
  .route("/:id/comments")
  .post(createProductComment)
  .get(getProductComments);

export default router;
