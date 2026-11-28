import { object, coerce, integer, string, min } from "superstruct";

const ProductCommentIdStruct = object({
  id: coerce(min(integer(), 1), string(), (value) => Number(value)),
});

export default ProductCommentIdStruct;
