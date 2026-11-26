import express from "express";
import {
  deleteArticleComment,
  updateArticleComment,
} from "../controllers/articleCommentController.js";

const router = express.Router();

router.route("/:id").patch(updateArticleComment).delete(deleteArticleComment);

export default router;
