import prisma from "../config/prisma.js";
import NotFoundException from "../exceptions/NotFoundException.js";

const getProducts = async ({ page, pageSize, orderBy, keyword }) => {
  // 검색 조건 설정
  const filters = {};

  if (keyword) {
    filters.OR = [
      { name: { contains: keyword, mode: "insensitive" } },
      { description: { contains: keyword, mode: "insensitive" } },
    ];
  }

  // 상품 목록 조회
  const products = await prisma.product.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
    },
  });

  // 검색 조건에 해당하는 전체 상품 개수
  const totalCount = await prisma.product.count({
    where: filters,
  });

  return {
    totalCount,
    list: products,
  };
};

const getProduct = async ({ id }) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      productToTag: { select: { tag: { select: { name: true } } } },
    },
  });
  if (!product) {
    throw new NotFoundException("상품을 찾을 수 없습니다.");
  }

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    createdAt: product.createdAt,
    tags: product.productToTag.map((tag) => tag.tag.name),
  };
};

const createProduct = async ({ name, price, description, tags }) => {
  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      productToTag: {
        create: tags.map((name) => ({
          tag: {
            connectOrCreate: {
              where: { name },
              create: { name },
            },
          },
        })),
      },
    },
    include: {
      productToTag: {
        select: {
          tag: {
            select: { name: true },
          },
        },
      },
    },
  });

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    tags: product.productToTag.map((tag) => tag.tag.name),
  };
};

const updateProduct = async ({ id, name, price, description, tags }) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw new NotFoundException("상품을 찾을 수 없습니다.");
  }

  const data = {};
  if (name) data.name = name;
  // 0은 falsy라서 무료나눔(0원)도 허용할 수 있게 작성
  if (price !== undefined) data.price = price;
  if (description) data.description = description;

  if (tags !== undefined) {
    const tagList = [...new Set(tags)];
    data.productToTag = {
      deleteMany: {},
      create: tagList.map((name) => ({
        tag: {
          connectOrCreate: {
            where: { name },
            create: { name },
          },
        },
      })),
    };
  }

  const newProduct = await prisma.product.update({
    where: { id },
    data,
    include: {
      productToTag: {
        select: {
          tag: {
            select: { name: true },
          },
        },
      },
    },
  });

  return {
    id: newProduct.id,
    name: newProduct.name,
    price: newProduct.price,
    description: newProduct.description,
    tags: newProduct.productToTag.map((tag) => tag.tag.name),
    updatedAt: newProduct.updatedAt,
  };
};

const deleteProduct = async ({ id }) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    throw new NotFoundException("상품을 찾을 수 없습니다.");
  }

  await prisma.product.delete({ where: { id } });
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
