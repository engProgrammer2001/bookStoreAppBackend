const User = require("../models/user.model");

const addToCart = async (req, res) => {
    try {
        // extract bookId from req.body
        const  bookId  = req.params.id;
        // extract userId from req.user
        const userId = req.user.userId.id;
        // find the user using userId

        const user = await User.findById(userId);
        // check if book is already in cart
        const isBookAlreadyInCart = user.cart.includes(bookId);
        if(isBookAlreadyInCart){
            return res.status(400).json({ message: "Book is already in your cart" });
        }
        // add book to cart
        user.cart.push(bookId);
        await user.save();

        // return success
        return res.status(200).json({ message: "Book added to cart" });
    } catch (error) {
        console.log("addToCart controller error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// get all favourite books of any users
const getAllCartBooks = async (req, res) => {
    try {
        const userId = req.user.userId.id;
        const userData = await User.findById(userId).populate("cart");

        if (!userData) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ status: "success", userData });
    } catch (error) {
        console.log("getAllCartBooks controller error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteFromCart = async (req, res) => {
    try {
        // extract bookId from req.body
        const  bookId  = req.params.id;
        // extract userId from req.user
        const userId = req.user.userId.id; 

        // find the user using userId
        const user = await User.findById(userId);
        // check if book is already in cart
        const isBookAlreadyInCart = user.cart.includes(bookId);
        if(!isBookAlreadyInCart){
            return res.status(400).json({ message: "Book is not in your cart" });
        }

        // delete book from cart
        const index = user.cart.indexOf(bookId);
        user.cart.splice(index, 1);
        await user.save();
        return res.status(200).json({ message: "Book deleted from cart" });

    } catch (error) {
        console.log("deleteFromCart controller error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// get cart of a perticular user
const getUserCart = async (req, res) => {
    try {
        // extract userId from req.user
        const userId = req.user.userId.id;
        // find the user cart using userId
        const userData = await User.findById(userId).populate("cart");
        const cart = userData.cart.reverse();

        return res.status(200).json({ status: "success", cart });

    } catch (error) {
        console.log("getUserCart controller error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    addToCart,
    getAllCartBooks,
    deleteFromCart,
    getUserCart

}