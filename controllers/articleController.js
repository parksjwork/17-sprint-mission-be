import { create } from "superstruct";
import CreateArticleStruct from "../structs/article/CreateArticleStruct.js";
import * as articleService from "../service/articleService.js";
import GetArticlesStruct from "../structs/article/GetArticlesStruct.js";
import ArticleIdStruct from "../structs/article/ArticleIdStruct.js";

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

export { createArticle, getArticles, getArticle };
