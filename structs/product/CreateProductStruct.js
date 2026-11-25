import{
  object,
  string,
  number,
  array,
  size,
  min,
  optional,
} from "superstruct";

const CreateProductStruct = object({
  name: size(string(), 1, 10),
  description: size(string(), 10, 100),
  price: min(number(), 0),
  tags: array(size(string(), 1, 5)),
  images: optional(array(string())),
});

export default CreateProductStruct;
