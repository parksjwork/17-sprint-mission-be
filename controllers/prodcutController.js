const Product = require("../models/product");
const { create } = require("superstruct");
const GetProductsStruct = require("../structs/product/GetProductsStruct");

// 전체 상품 목록 조회
const getProducts = async (req, res) => {
  const { page, pageSize, orderBy, keyword } = create(
    req.query,
    GetProductsStruct,
  );

  // - 검색(keyword) -> 정렬(orderBy) -> 페이지(page) 순서로 처리
  const filters = {};

  if (keyword) {
    filters.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  // mongoDB에서는 1,-1로 정렬 방향을 지정 (-1: 내림차순)
  const sort = { createdAt: -1 };

  // offset 방식을 이용한 페이지네이션
  const products = await Product.find(filters)
    .sort(sort)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  // 글의 전체 갯수
  const totalCount = await Product.countDocuments(filters);

  res.status(200).json({
    totalCount,
    list: products,
  });
};

module.expors = { getProducts };
