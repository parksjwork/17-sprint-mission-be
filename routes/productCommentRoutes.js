import express from "express";
import {
  deleteProductComment,
  updateProductComment,
} from "../controllers/productCommentController.js";

const router = express.Router();

router.route("/:id").patch(updateProductComment).delete(deleteProductComment);

export default router;
