import { partial } from "superstruct";
import CreateArticleStruct from "./CreateArticleStruct.js";

const UpdateArticleStruct = partial(CreateArticleStruct);

export default UpdateArticleStruct;
