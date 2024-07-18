const express = require("express");
const router = express.Router();
const jwtAuthMiddleware = require("../jwt.js");
const favouriteController = require("../controller/favourite.controller.js");


router.put("/add/:id", jwtAuthMiddleware,  favouriteController.addBookToFavourite);
router.delete("/delete/:id", jwtAuthMiddleware,  favouriteController.deleteBookFromFavourite);
router.get("/", jwtAuthMiddleware,  favouriteController.getAllFavouriteBooks);



module.exports = router;