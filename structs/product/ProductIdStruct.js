import { object, coerce, integer, string, min } from "superstruct";

const ProductIdStruct = object({
  id: coerce(min(integer(), 1), string(), (value) => Number(value)),
});

export default ProductIdStruct;
