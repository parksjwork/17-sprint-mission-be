const Product = require("../models/product");
const { create, assert } = require("superstruct");
const GetProductsStruct = require("../structs/product/GetProductsStruct");
const CreateProductStruct = require("../structs/product/CreateProductStruct");
const ProductIdStruct = require("../structs/product/ProductIdStruct");
const NotFoundProduct = require("../exceptions/NotFoundProduct");
const UpdateProductRequestStruct = require("../structs/product/UpdateProductRequestStruct");

// 전체 상품 목록 조회
const getProducts = async (req, res) => {
  const { page, pageSize, orderBy, keyword } = create(
    req.query,
    GetProductsStruct,
  );

  // - 검색(keyword) -> 정렬(orderBy) -> 페이지(page) 순서로 처리
  const filters = {};

  if (keyword) {
    // 특수문자를 이스케이프로 처리함
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filters.$or = [
      { name: { $regex: escapedKeyword, $options: "i" } },
      { description: { $regex: escapedKeyword, $options: "i" } },
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

// 상품 수정
const updateProduct = async (req, res) => {
  assert(req.params, ProductIdStruct);

  const { name, description, price, tags, images } = create(
    req.body,
    UpdateProductRequestStruct,
  );

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new NotFoundProduct("상품을 찾을 수 없습니다.");
  }

  if (name) product.name = name;
  if (description) product.description = description;
  // 0은 falsy라서 무료나눔(0원)도 허용할 수 있게 작성
  if (price !== undefined) product.price = price;
  if (tags) product.tags = tags;
  if (images) product.images = images;

  await product.save();

  res.status(200).json(product);
};

// 상품 삭제
const deleteProduct = async (req, res) => {
  assert(req.params, ProductIdStruct);

  const result = await Product.deleteOne({ _id: req.params.id });
  if (result.deletedCount !== 1) {
    throw new NotFoundProduct("상품을 찾을 수 없습니다.");
  }
  res.status(204).end();
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
