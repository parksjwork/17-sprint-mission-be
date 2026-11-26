import {
  createArticleComment,
  getArticleComments,
} from "../controllers/articleCommentController.js";
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

import express from "express";

const router = express.Router();

// 게시글
router.route("/").post(createArticle).get(getArticles);
router.route("/:id").get(getArticle).patch(updateArticle).delete(deleteArticle);

// 게시글 댓글 (작성)
router
  .route("/:id/comments")
  .post(createArticleComment)
  .get(getArticleComments);

export default router;
