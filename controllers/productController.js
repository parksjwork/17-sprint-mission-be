import prisma from "../config/prisma.js";
import { create, assert } from "superstruct";
import GetProductsStruct from "../structs/product/GetProductsStruct.js";
import CreateProductStruct from "../structs/product/CreateProductStruct.js";
import ProductIdStruct from "../structs/product/ProductIdStruct.js";
import NotFoundExeption from "../exceptions/NotFoundExeption.js";
import UpdateProductRequestStruct from "../structs/product/UpdateProductRequestStruct.js";
import * as productService from "../services/productService.js";

// 전체 상품 목록 조회
const getProducts = async (req, res) => {
  // 유효성 검증
  const { page, pageSize, orderBy, keyword } = create(
    req.query,
    GetProductsStruct,
  );

  const result = await productService.getProducts({
    page,
    pageSize,
    orderBy,
    keyword,
  });

  res.status(200).json(result);
};

// 상품 상세 페이지
const getProduct = async (req, res) => {
  assert(req.params, ProductIdStruct);

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new NotFoundExeption("상품을 찾을 수 없습니다.");
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
    throw new NotFoundExeption("상품을 찾을 수 없습니다.");
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
    throw new NotFoundExeption("상품을 찾을 수 없습니다.");
  }
  res.status(204).end();
};

export { getProducts, createProduct, getProduct, updateProduct, deleteProduct };
