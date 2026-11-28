import GetProductsStruct from "../structs/product/GetProductsStruct.js";
import CreateProductStruct from "../structs/product/CreateProductStruct.js";
import ProductIdStruct from "../structs/product/ProductIdStruct.js";
import UpdateProductRequestStruct from "../structs/product/UpdateProductRequestStruct.js";
import * as productService from "../service/productService.js";
import { create } from "superstruct";

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
  const { id } = create(req.params, ProductIdStruct);

  const product = await productService.getProduct({ id });

  res.status(200).json(product);
};

// 상품 등록
const createProduct = async (req, res) => {
  const { name, description, price, tags } = create(
    req.body,
    CreateProductStruct,
  );

  const product = await productService.createProduct({
    name,
    price,
    description,
    tags,
  });
  res.status(201).json(product);
};

// 상품 수정
const updateProduct = async (req, res) => {
  const { id } = create(req.params, ProductIdStruct);

  const { name, description, price, tags } = create(
    req.body,
    UpdateProductRequestStruct,
  );

  const product = await productService.updateProduct({
    id,
    name,
    description,
    price,
    tags,
  });

  res.status(200).json(product);
};

// 상품 삭제
const deleteProduct = async (req, res) => {
  const { id } = create(req.params, ProductIdStruct);

  await productService.deleteProduct({ id });

  res.status(204).end();
};
export { getProducts, createProduct, getProduct, updateProduct, deleteProduct };
