
const express = require("express");
const router = express.Router();
const jwtAuthMiddleware = require("../jwt.js");
const orderController = require("../controller/order.controller.js");

router.post("/place/:id", jwtAuthMiddleware,  orderController.placeOrder);
router.get("/user/order", jwtAuthMiddleware,  orderController.getOrderHistory);
router.get("/admin/order", jwtAuthMiddleware,  orderController.getAllOrderHistory);
router.put("/admin/order/update", jwtAuthMiddleware,  orderController.updateOrderStatus);


module.exports = router;