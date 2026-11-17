const {
  object,
  string,
  integer,
  min,
  max,
  enums,
  coerce,
  defaulted,
} = require("superstruct");

const GetProductsStruct = object({
  page: defaulted(
    coerce(min(integer(), 1), string(), (value) => Number(value)),
    1,
  ),

  pageSize: defaulted(
    coerce(max(min(integer(), 1), 100), string(), (value) => Number(value)),
    10,
  ),

  orderBy: defaulted(enums(["recent"]), "recent"),

  keyword: defaulted(string(), ""),
});

module.exports = GetProductsStruct;
