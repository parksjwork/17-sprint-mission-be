import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

import express from "express";

const router = express.Router();

router.route("/").post(createArticle).get(getArticles);
router.route("/:id").get(getArticle).patch(updateArticle).delete(deleteArticle);

export default router;
