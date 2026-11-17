const { partial } = require("superstruct");
const CreateProductStruct = require("./CreateProductStruct");

// partial : 모든 필드를 optional로 변경하는 함수
const UpdateProductRequestStruct = partial(CreateProductStruct);

module.exports = UpdateProductRequestStruct;
