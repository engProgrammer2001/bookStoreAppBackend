
const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../jwt.js');
const cartController = require('../controller/cart.controller.js');

router.put("/add/:id", jwtAuthMiddleware,  cartController.addToCart);
router.get("/getallbooks", jwtAuthMiddleware,  cartController.getAllCartBooks);
router.get("/", jwtAuthMiddleware,  cartController.getUserCart);
router.put("/delete/:id", jwtAuthMiddleware,  cartController.deleteFromCart);

module.exports = router;