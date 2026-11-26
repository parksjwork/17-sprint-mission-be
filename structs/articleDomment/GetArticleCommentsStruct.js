import {
  object,
  optional,
  integer,
  coerce,
  string,
  min,
  max,
  defaulted,
} from "superstruct";

const GetArticleCommentsStruct = object({
  cursor: optional(coerce(min(integer(), 1), string(), Number)),
  limit: defaulted(coerce(max(min(integer(), 1), 100), string(), Number), 10),
});

export default GetArticleCommentsStruct;
