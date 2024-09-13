const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Book = mongoose.model("books", bookSchema);
module.exports = Book;