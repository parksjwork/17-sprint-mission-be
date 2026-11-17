const { object, string, pattern } = require("superstruct");

const ProductIdStruct = object({
  id: pattern(string(), /^[0-9a-fA-F]{24}$/),
});

module.exports = ProductIdStruct;
