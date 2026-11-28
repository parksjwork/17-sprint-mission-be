import{
  object,
  string,
  integer,
  array,
  size,
  min,
} from "superstruct";

const CreateProductStruct = object({
  name: size(string(), 1, 10),
  description: size(string(), 10, 100),
  price: min(integer(), 0),
  tags: array(size(string(), 1, 5)),
});

export default CreateProductStruct;
