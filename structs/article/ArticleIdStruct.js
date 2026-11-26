import { object, coerce, integer, string, min } from "superstruct";

const ArticleIdStruct = object({
  id: coerce(min(integer(), 1), string(), (value) => Number(value)),
});

export default ArticleIdStruct;
