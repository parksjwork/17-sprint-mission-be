import { object, string, size, trimmed } from "superstruct";

const CreateArticleCommentStruct = object({
  content: size(trimmed(string()), 1, Infinity),
});

export default CreateArticleCommentStruct;
