import { object, string, pattern } from"superstruct";

const ProductIdStruct = object({
  id: pattern(string(), /^[0-9a-fA-F]{24}$/),
});

export default ProductIdStruct;
