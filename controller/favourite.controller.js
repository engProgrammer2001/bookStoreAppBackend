const User = require("../models/user.model");

// add book to favourite;
const addBookToFavourite = async (req, res) => {
  try {
    // I'll find user using userId
    const userId = req.user.userId.id;
    const bookId = req.params.id;
    // console.log("bookId", bookId, "userId", userId);

    // I'll find user using userId
    const userData = await User.findById(userId);

    // I'll check if book is already in the favourite
    const isBookAlreadyInFavourite = userData.favourites.includes(bookId);
    // console.log("isBookAlreadyInFavourite", isBookAlreadyInFavourite);

    if (isBookAlreadyInFavourite) {
      return res
        .status(400)
        .json({ message: "Book is already in your favourite list" });
    }

    // I'll add book to favourite
    userData.favourites.push(bookId);
    await userData.save();
    return res.status(200).json({ message: "Book added to favourite" });
  } catch (error) {
    console.log("addBookToFavourite controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete book from favourite;
const deleteBookFromFavourite = async (req, res) => {
  try {
    // extrac userId from req.user
    const userId = req.user.userId.id;
    const bookId = req.params.id;

    // find the user using userId
    const userData = await User.findById(userId);

    // check if book is already in the favourite
    const isBookAlreadyInFavourite = userData.favourites.includes(bookId);
    if (!isBookAlreadyInFavourite) {
      return res
        .status(400)
        .json({ message: "Book is not in your favourite list" });
    }

    // delete book from favourite
    const index = userData.favourites.indexOf(bookId);
    userData.favourites.splice(index, 1);
    await userData.save();
    return res.status(200).json({ message: "Book Removed from favourite" });
  } catch (error) {
    console.log();
  }
};

// get all favourite books of any users
const getAllFavouriteBooks = async (req, res) => {
  try {
    const userId = req.user.userId.id;
    const userData = await User.findById(userId).populate("favourites");

    return res.status(200).json({ status: "success", userData });
  } catch (error) {
    console.log("getAllFavouriteBooks controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addBookToFavourite,
  deleteBookFromFavourite,
  getAllFavouriteBooks,
};
