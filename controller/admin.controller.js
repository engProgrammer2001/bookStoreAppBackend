const Book = require("../models/book.model");
const User = require("../models/user.model");

const addBooks = async (req, res) => {
  try {
    // extract userId from req.user
    const userId = req.user.userId.id;

    // check if user is admin
    const user = await User.findById(userId);
    if (user.role !== "admin") {
      return res.status(401).json({ message: "you don't have admin access" });
    }

    // check if book already exists
    const book = await Book.findOne({ title: req.body.title });
    if (book) {
      return res.status(400).json({ message: "book already exists" });
    }

    // add new book to the database
    const Newbook = new Book({
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      discountPrice: req.body.discountPrice,
      discountPercentage: req.body.discountPercentage,
      description: req.body.description,
      category: req.body.category,
      language: req.body.language,
      publishedDate: req.body.publishedDate,
    });

    await Newbook.save();
    // console.log("Newbook", Newbook);
    return res
      .status(200)
      .json({ message: "book added successfully", book: Newbook });
  } catch (error) {
    console.log("addBooks controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update books details
const updateBook = async (req, res) => {
  try {
    // extract userId from req.user
    const userId = req.user.userId.id;

    // check if user is admin
    const user = await User.findById(userId);
    if (user.role !== "admin") {
      return res.status(401).json({ message: "You don't have admin access" });
    }

    // check if book exists
    const bookId = req.params.id;
    // console.log("bookId", bookId);
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // update book details
    book.imageUrl = req.body.imageUrl || book.imageUrl;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.price = req.body.price || book.price;
    book.discountPrice = req.body.discountPrice || book.discountPrice;
    book.discountPercentage =
      req.body.discountPercentage || book.discountPercentage;
    book.description = req.body.description || book.description;
    book.category = req.body.category || book.category;
    book.language = req.body.language || book.language;
    book.publishedDate = req.body.publishedDate || book.publishedDate;

    await book.save();
    // console.log("Updated book", book);
    return res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.log("updateBook controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete book from database
const deleteBook = async (req, res) => {
  try {
    // extract bookId
    const bookId = req.params.id;

    // check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // delete book
    await Book.findByIdAndDelete(bookId);

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("deleteBook controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//  get all books data
const getAllBooks = async (req, res) => {
  try {
    // extract all books
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: "success", books: books });
  } catch (error) {
    console.log("getAllBooks controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//get recent add add 4 books
const getRecentBooks = async (req, res) => {
  try {
    const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ status: "success", recentBooks });
  } catch (error) {
    console.log("getRecentBooks controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get book by id
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    return res.status(200).json({ status: "success", book });
  } catch (error) {
    console.log("getBookById controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  addBooks,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
  getBookById,
};
