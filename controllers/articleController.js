import { create } from "superstruct";
import CreateArticleStruct from "../structs/article/CreateArticleStruct.js"
import * as articleService from "../service/articleService.js"

const createArticle = async (req, res) => {
  const { title, content } = create(req.body, CreateArticleStruct);

  const article = await articleService.createArticle({ title, content });

  res.status(201).json(article);
};

export {createArticle}