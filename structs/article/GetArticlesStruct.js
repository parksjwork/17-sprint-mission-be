import {
  object,
  string,
  integer,
  min,
  max,
  enums,
  defaulted,
  coerce,
} from "superstruct";

const GetArticlesStruct = object({
  page: defaulted(coerce(min(integer(), 1), string(), Number), 1),
  pageSize: defaulted(
    coerce(max(min(integer(), 1), 100), string(), Number),
    10,
  ),
  orderBy: defaulted(enums(["recent"]), "recent"),
  keyword: defaulted(string(), ""),
});

export default GetArticlesStruct;
