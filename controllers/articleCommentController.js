import { create } from "superstruct";
import ArticleIdStruct from "../structs/article/ArticleIdStruct.js";
import GetArticleCommentsStruct from "../structs/articleDomment/GetArticleCommentsStruct.js";
import CreateArticleCommentStruct from "../structs/articleDomment/CreateArticleCommentStruct.js";
import * as articleCommentService from "../service/articleCommentService.js";

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

export { createArticleComment, getArticleComments };
