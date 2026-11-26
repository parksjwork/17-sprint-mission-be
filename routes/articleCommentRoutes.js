import express from "express";
import { updateArticleComment } from "../controllers/articleCommentController.js";

const router = express.Router();

router.route("/:id").patch(updateArticleComment);

export default router;
