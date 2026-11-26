import { create } from "superstruct";
import * as articleCommentService from "../service/articleCommentService.js";
import ArticleIdStruct from "../structs/article/ArticleIdStruct.js";
import GetArticleCommentsStruct from "../structs/articleComment/GetArticleCommentsStruct.js";
import CreateArticleCommentStruct from "../structs/articleComment/CreateArticleCommentStruct.js";
import UpdateArticleCommentStruct from "../structs/articleComment/UpdateArticleCommentStruct.js";
import ArticleCommentIdStruct from "../structs/articleComment/ArticleCommentStruct.js";

const createArticleComment = async (req, res) => {
  const { id } = create(req.params, ArticleIdStruct);
  const { content } = create(req.body, CreateArticleCommentStruct);

  const comment = await articleCommentService.createArticleComment({
    articleId: id,
    content,
  });
  res.status(201).json(comment);
};

const getArticleComments = async (req, res) => {
  const { id: articleId } = create(req.params, ArticleIdStruct);
  const query = create(req.query, GetArticleCommentsStruct);

  const result = await articleCommentService.getArticleComments(
    articleId,
    query,
  );

  res.status(200).json(result);
};

const updateArticleComment = async (req, res) => {
  const { id } = create(req.params, ArticleCommentIdStruct);
  const { content } = create(req.body, UpdateArticleCommentStruct);

  const comment = await articleCommentService.updateArticleComment(id, {
    content,
  });

  res.status(200).json(comment);
};

export { createArticleComment, getArticleComments, updateArticleComment };
