import { object, string, size, trimmed } from "superstruct";

const CreateArticleStruct = object({
  title: size(trimmed(string()), 1, 200),
  content: size(trimmed(string()), 1, Infinity),
});

export default CreateArticleStruct;
