import { create } from "superstruct";
import CreateArticleStruct from "../structs/article/CreateArticleStruct.js";
import * as articleService from "../service/articleService.js";
import GetArticlesStruct from "../structs/article/GetArticlesStruct.js";
import ArticleIdStruct from "../structs/article/ArticleIdStruct.js";
import UpdateArticleStruct from "../structs/article/UpdateArticleStruct.js";

const createArticle = async (req, res) => {
  const { title, content } = create(req.body, CreateArticleStruct);

  const article = await articleService.createArticle({ title, content });

  res.status(201).json(article);
};

const getArticles = async (req, res) => {
  const { page, pageSize, orderBy, keyword } = create(
    req.query,
    GetArticlesStruct,
  );

  const articles = await articleService.getArticles({
    page,
    pageSize,
    orderBy,
    keyword,
  });

  res.status(200).json(articles);
};

const getArticle = async (req, res) => {
  const { id } = create(req.params, ArticleIdStruct);

  const article = await articleService.getArticle({ id });

  res.status(200).json(article);
};

const updateArticle = async (req, res) => {
  const { id } = create(req.params, ArticleIdStruct);
  const { title, content } = create(req.body, UpdateArticleStruct);

  const article = await articleService.updateArticle({ id, title, content });

  res.status(200).json(article);
};

const deleteArticle = async (req, res) => {
  const { id } = create(req.params, ArticleIdStruct);
  await articleService.deleteArticle({id});

  res.status(204).end();
};

export { createArticle, getArticles, getArticle, updateArticle, deleteArticle };
