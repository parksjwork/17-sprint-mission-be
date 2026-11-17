const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // 상품 이름
    name: { type: String, required: true, trim: true },
    // 상품 설명
    description: {
      type: String,
      required: true,
      trim: true,
    },
    // 상품 가격
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // 태그
    tags: { type: [String], default: [] },
    // 좋아요 수
    favoriteCount: {
      type: Number,
      default: 0,
    },
    // 상품 이미지
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Product", productSchema);
