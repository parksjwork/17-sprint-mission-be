import { object, string, size, trimmed } from "superstruct";

const CreateProductCommentStruct = object({
  content: size(trimmed(string()), 1, Infinity),
});

export default CreateProductCommentStruct;