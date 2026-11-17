const Product = require("../models/product");
const { create, assert } = require("superstruct");
const GetProductsStruct = require("../structs/product/GetProductsStruct");
const CreateProductStruct = require("../structs/product/CreateProductStruct");
const ProductIdStruct = require("../structs/product/ProductIdStruct");

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

// 상품 상세 페이지
const getProduct = async (req, res) => {
  assert(req.params, ProductIdStruct);

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new NotFoundProduct("상품을 찾을 수 없습니다.");
  }
  res.status(200).json(product);
};

// 상품 등록
const createProduct = async (req, res) => {
  const { name, description, price, tags, images } = create(
    req.body,
    CreateProductStruct,
  );

  const product = await Product.create({
    name,
    description,
    price,
    tags,
    images,
  });
  res.status(201).json(product);
};

//

module.exports = { getProducts, createProduct };
